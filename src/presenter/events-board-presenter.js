import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import { eventsFilter } from '../utils/events-filter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { getEventsDuration } from '../utils/trip-events.js';
import { render, remove } from '../framework/render.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsBoardPresenter {
  #tripEventListComponent = new TripEventListView();
  #loadingComponent = new LoadingView();
  #noEventsComponent = null;
  #sortComponent = null;
  #eventsModel = null;
  #filterModel = null;
  #eventsContainer = null;
  #eventNewPresenter = null;
  #eventPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY_DOWN;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(eventsContainer, eventsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventsModel, this.#tripEventListComponent.element, this.#handleViewAction);

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.eventsFilter;
    const events = this.#eventsModel.events;
    const filteredEvents = eventsFilter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => tripEventB.basePrice - tripEventA.basePrice);
      case SortType.TIME_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => getEventsDuration(tripEventB) - getEventsDuration(tripEventA));
      default:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => new Date(tripEventA.dateFrom).getDate() - new Date(tripEventB.dateFrom).getDate());
    }
  }

  init = () => {
    this.#renderEventList();
  };

  createEvent = (callback) => {
    this.#currentSortType = SortType.DAY_DOWN;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    if (this.events.length) {
      this.#sortComponent = new SortView(this.#currentSortType);
      this.#sortComponent.setSortControlClickHandler(this.#handleSortTypeChange);
      render(this.#sortComponent, this.#eventsContainer);
    }
  };

  #renderNoEvents = () => {
    this.#noEventsComponent = new EmptyListView(this.#filterType);
    render(this.#noEventsComponent, this.#eventsContainer);
  };

  #renderEvent = (tripEvent) => {
    const eventPresenter = new EventPresenter(this.#eventsModel, this.#tripEventListComponent.element, this.#handleViewAction, this.#handleModeChange);

    eventPresenter.init(tripEvent);
    this.#eventPresenters.set(tripEvent.id, eventPresenter);
  };

  #renderEventList = () => {
    if (this.#isLoading) {
      render(this.#loadingComponent, this.#eventsContainer);
      return;
    }

    if (!this.events.length) {
      this.#renderNoEvents();
    }

    this.#renderSort();
    render(this.#tripEventListComponent, this.#eventsContainer);
    for (let i = 0; i < this.events.length; i++) {
      this.#renderEvent(this.events[i]);
    }
  };

  #clearEventList = (resetSortType = false) => {
    this.#eventNewPresenter.destroy();
    remove(this.#sortComponent);
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY_DOWN;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#eventNewPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch (err) {
          this.#eventNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#eventPresenters.get(updatedEvent.id)) {
          this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
        }
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderEventList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({ resetSortType: true });
        this.#renderEventList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderEventList();
  };
}

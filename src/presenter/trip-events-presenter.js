import SortView from '../view/sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import { eventsFilter } from '../utils/events-filter.js';
import { FilterType, SortType, UpdateType } from '../const.js';
import { getEventsDuration, getCurrentOffers } from '../utils/trip-events.js';
import { render, remove } from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventListComponent = new TripEventListView();
  #loadingComponent = new LoadingView();
  #noEventsComponent = null;
  #sortComponent = null;
  #eventsContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #offers = [];
  #destionations = [];
  #eventPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY_DOWN;
  #isLoading = true;

  constructor(eventsContainer, eventsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#offers = eventsModel.offers;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.eventsFilter;
    const events = this.#eventsModel.events;
    const filteredEvents = eventsFilter[this.#filterType](events);

    switch(this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => tripEventB.basePrice - tripEventA.basePrice);
      case SortType.TIME_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => getEventsDuration(tripEventB) - getEventsDuration(tripEventA));
      default:
        return filteredEvents;
    }
  }

  get offers() {
    this.#offers = this.#eventsModel.offers;
    return this.#offers;
  }

  get destinations() {
    this.#destionations = this.#eventsModel.destinations;
    return this.#destionations;
  }

  init = () => {
    this.#renderEventList();
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
    const eventPresenter = new EventPresenter(this.#eventsModel, this.#tripEventListComponent.element);
    const offers = getCurrentOffers(tripEvent, this.offers);

    eventPresenter.init(tripEvent, offers);
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

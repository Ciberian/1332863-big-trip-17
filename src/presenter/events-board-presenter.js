import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import { eventsFilter } from '../utils/events-filter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { getEventsDuration, getCurrentOffers } from '../utils/trip-events.js';
import { render, remove, RenderPosition } from '../framework/render.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class EventsBoardPresenter {
  #tripEventListComponent = new TripEventListView();
  #loadingComponent = new LoadingView();
  #noEventsComponent = null;
  #tripInfoComponent = null;
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

    if (!events.length) {
      return events;
    }

    const filteredEvents = eventsFilter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => tripEventB.basePrice - tripEventA.basePrice);
      case SortType.TIME_DOWN:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => getEventsDuration(tripEventB) - getEventsDuration(tripEventA));
      default:
        return filteredEvents.slice().sort((tripEventA, tripEventB) => new Date(tripEventA.dateFrom) - new Date(tripEventB.dateFrom));
    }
  }

  init = () => {
    this.#renderTripInfo();
    this.#renderEventList();
  };

  createEvent = (callback) => {
    this.#currentSortType = SortType.DAY_DOWN;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #renderTripInfo = () => {
    const allEvents = this.#eventsModel.events;
    const allOffers = this.#eventsModel.offers;

    if (!allEvents.length) {
      return;
    }

    const basePriceSum = allEvents.reduce((sum, tripEvent) => {
      sum += tripEvent.basePrice;
      return sum;
    }, 0);

    const offersPriceSum = allEvents.reduce((totalSum, tripEvent) => {
      const currentOffers = getCurrentOffers(tripEvent.type, allOffers);
      const activeCurrentOffers = currentOffers.offers.filter((offer) => tripEvent.offers.some((id) => id === offer.id));
      const activeOffersPriceSum = activeCurrentOffers.reduce((sum, offer) => {
        sum += offer.price;
        return sum;
      }, 0);

      totalSum += activeOffersPriceSum;

      return totalSum;
    }, 0);

    const chronologicalEvents = allEvents.slice().sort((tripEventA, tripEventB) => new Date(tripEventA.dateFrom) - new Date(tripEventB.dateFrom));

    const tripInfo = {
      firstDestination: chronologicalEvents[0].destination.name,
      secondDestination: chronologicalEvents.length === 3 ? chronologicalEvents[1].destination.name : null,
      lastDestination: chronologicalEvents[chronologicalEvents.length - 1].destination.name,
      startDate: allEvents.map((tripEvent) => tripEvent.dateFrom).sort((dateA, dateB) => new Date(dateA) - new Date(dateB))[0],
      endDate: allEvents.map((tripEvent) => tripEvent.dateTo).sort((dateA, dateB) => new Date(dateB) - new Date(dateA))[0],
      totalPrice: basePriceSum + offersPriceSum,
      isOnlyOneEvent: chronologicalEvents.length === 1,
      isOnlyTwoEvents: chronologicalEvents.length === 2
    };

    this.#tripInfoComponent = new TripInfoView(tripInfo);
    render(this.#tripInfoComponent, document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
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
    this.events.forEach((tripEvent) => {
      this.#renderEvent(tripEvent);
    });
  };

  #clearEventList = (resetSortType = false) => {
    this.#eventNewPresenter.destroy();
    remove(this.#sortComponent);
    remove(this.#tripInfoComponent);
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY_DOWN;
    }
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
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
        this.#renderTripInfo();
        this.#renderEventList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({ resetSortType: true });
        this.#renderTripInfo();
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
    this.#renderTripInfo();
    this.#renderEventList();
  };
}

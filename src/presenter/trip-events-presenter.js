import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-event-list-view.js';
import TripEventContainerView from '../view/trip-event-containter-view.js';
import TripEventView from '../view/trip-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import LoadingView from '../view/loading-view.js';
import { eventsFilter } from '../utils/events-filter.js';
import { getEventsDuration } from '../utils/trip-events.js';
import { FilterType, SortType, UpdateType } from '../const.js';
import { render, remove, replace } from '../framework/render.js';

const siteHeaderInfoElement = document.querySelector('.trip-main');
const createEventBtn = document.querySelector('.trip-main__event-add-btn');

const addCreateForm = (eventData, offersData) => {
  const createFormContainerComponent = new TripEventContainerView();
  const createFormComponent = new EditFormView(eventData, offersData);
  render(createFormContainerComponent, document.querySelector('.trip-events__list'), 'AFTERBEGIN');
  render(createFormComponent, createFormContainerComponent.element);
  createEventBtn.disabled = true;
};

createEventBtn.addEventListener('click', addCreateForm);

const addEditForm = (eventData, offersData, tripEventComponent) => {
  if(document.querySelector('.event--edit')) {
    removeEditForm();
  }

  const editFormComponent = new EditFormView(eventData, offersData);

  replace(editFormComponent, tripEventComponent);
  editFormComponent.setClickHandler(() => onCloseBtnClick(editFormComponent, tripEventComponent));
};

function removeEditForm(editFormComponent, tripEventComponent) {
  replace(tripEventComponent, editFormComponent);
}

function onCloseBtnClick(editFormComponent, tripEventComponent) {
  removeEditForm(editFormComponent, tripEventComponent);
}

const getCurrentOffers = (eventData, offersData) => {
  const { offers: offerIds, type: offerType } = eventData;
  const currentOffers = offersData.find((offer) => offer.type === offerType);

  return currentOffers.offers.filter(({ id }) => offerIds.some((offerId) => offerId === id));
};

export default class TripEventsPresenter {
  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #eventsContainer = null;
  #sortComponent = null;
  #eventsModel = null;
  #filterModel = null;
  #events = [];
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

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
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
    if (this.films.length) {
      this.#sortComponent = new SortView(this.#currentSortType);
      this.#sortComponent.setSortControlClickHandler(this.#handleSortTypeChange);

      render(this.#sortComponent, this.eventsContainer);
    }
  };

  #renderEvent = (eventData, currentOffers) => {
    const tripEventComponent = new TripEventView(eventData, currentOffers);
    const tripEventContainerComponent = new TripEventContainerView();

    tripEventComponent.setClickHandler(() => addEditForm(eventData, this.#offers, tripEventComponent));

    render(tripEventContainerComponent, this.#tripListComponent.element);
    render(tripEventComponent, tripEventContainerComponent.element);
  };

  #renderEventList = () => {
    if (this.#events.length === 0) {
      render(new EmptyListView('Everything'), this.#eventsContainer);
      return;
    }

    render(new TripInfoView(), siteHeaderInfoElement, 'afterbegin');

    render(this.#tripListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], getCurrentOffers(this.#events[i], this.#offers));
    }
  };

  #clearEventList = () => {};

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
        this.#clearEventList({
          resetRenderedFilmCount: true,
          resetSortType: true,
          isCommentModelInit: updatedEvent?.isCommentModelInit,
        });
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

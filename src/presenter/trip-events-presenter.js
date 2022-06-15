import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-event-list-view.js';
import TripEventContainerView from '../view/trip-event-containter-view.js';
import TripEventView from '../view/trip-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';

const siteHeaderInfoElement = document.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
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
  #eventsContainer = null;
  #eventsModel = null;
  #events = [];
  #offers = [];

  constructor(eventsContainer, eventsModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#offers = [...this.#eventsModel.offers];
  }

  get tripEvents() {
    this.#events = this.#eventsModel.events;
    return this.#events;
  }

  init = () => {
    render(new FilterView(this.#events.length), siteHeaderFilterElement);
    this.#renderEventList();
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
    render(new SortView(), this.#eventsContainer);
    render(this.#tripListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], getCurrentOffers(this.#events[i], this.#offers));
    }
  };
}

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-event-list-view.js';
import TripEventContainerView from '../view/trip-event-containter-view.js';
import TripEventView from '../view/trip-event-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import CreationFormView from '../view/creation-form-view.js';
import { render, replace } from '../framework/render.js';

const siteHeaderInfoElement = document.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const createEventBtn = document.querySelector('.trip-main__event-add-btn');

const addCreateForm = () => {
  const createFormContainerComponent = new TripEventContainerView();
  const createFormComponent = new CreationFormView();
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
  #pointsContainer = null;
  #pointsModel = null;
  #points = [];
  #offers = [];

  constructor(pointsContainer, pointsModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
  }

  init = () => {
    render(new FilterView(this.#points.length), siteHeaderFilterElement);
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
    if (this.#points.length === 0) {
      render(new EmptyListView('Everything'), this.#pointsContainer);
      return;
    }

    render(new TripInfoView(), siteHeaderInfoElement, 'afterbegin');
    render(new SortView(), this.#pointsContainer);
    render(this.#tripListComponent, this.#pointsContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderEvent(this.#points[i], getCurrentOffers(this.#points[i], this.#offers));
    }
  };
}

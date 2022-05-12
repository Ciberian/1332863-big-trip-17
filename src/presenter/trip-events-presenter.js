import TripListView from '../view/trip-event-list-view.js';
import TripEventContainerView from '../view/trip-event-containter-view.js';
import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';

const addEditForm = (eventData, offers, tripEventComponent) => {
  if(document.querySelector('.event--edit')) {
    removeEditForm();
  }

  const selectedOffers = offers.filter(({id}) => eventData.offers.some((offerId) => offerId === Number(id)));
  const editFormComponent = new EditFormView(eventData, selectedOffers);

  replace(editFormComponent, tripEventComponent);
  document.body.classList.add('hide-overflow');
  editFormComponent.setClickHandler(() => onCloseBtnClick(editFormComponent, tripEventComponent));
};

function removeEditForm(editFormComponent, tripEventComponent) {
  document.body.classList.remove('hide-overflow');
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
  #tripEventContainerComponent = new TripEventContainerView();
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
    this.#renderEventList();
  };

  #renderEvent = (eventData, currentOffers) => {
    const tripEventComponent = new TripEventView(eventData, currentOffers);
    tripEventComponent.setClickHandler(() => addEditForm(eventData, currentOffers, tripEventComponent));
    render(tripEventComponent, this.#tripEventContainerComponent.element);
  };

  #renderEventList = () => {
    render(this.#tripListComponent, this.#pointsContainer);
    render(this.#tripEventContainerComponent, this.#tripListComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderEvent(this.#points[i], getCurrentOffers(this.#points[i], this.#offers));
    }
  };
}

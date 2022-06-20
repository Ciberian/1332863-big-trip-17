import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getCurrentOffers, getCurrentDestination } from '../utils/trip-events.js';
import { offerType } from '../const.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  isFavorite: false,
  destination: null,
  offers: null,
  type: 'taxi'
};

const createEditFormTemplate = (state) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    offerIds,
    allOffers,
    destination,
    allDestinations,
    isDeleting,
    isDisabled,
    isSaving
  } = state;

  const currentOffers = getCurrentOffers(type, allOffers);
  const currentDestination = getCurrentDestination(destination?.name, allDestinations);

  const renderEventTypeItems = () => offerType.reduce(((eventTypeTemplate, offer) => (
    eventTypeTemplate += `
    <div class="event__type-item">
      <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}" ${(offer === type) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer[0].toUpperCase()}${offer.slice(1)}</label>
    </div>`)), '');

  const renderEventOffers = () => currentOffers.reduce(((eventOffersTemplate, offer) => (
    eventOffersTemplate += `
    <div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${offerIds.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`)), '');

  const getPicturesTemplate = () => currentDestination.pictures.reduce((picturesTemplate, picture) => (
    picturesTemplate += `<img class="event__photo" src=${picture.src} alt=${picture.description}></img>`), '');

  const getDestinationsTemplate = () => allDestinations.reduce((picturesTemplate, tripDestination) => (
    picturesTemplate += `<option value=${tripDestination.name}></option>`), '');

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"  ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${renderEventTypeItems()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type[0].toUpperCase()}${type.slice(1)}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${currentDestination ? currentDestination.name : 'Chamonix'}"
            list="destination-list-1"
            ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${getDestinationsTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>

      </header>
      ${ offerIds?.length || currentDestination ? `
      <section class="event__details">
        ${offerIds?.length ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${renderEventOffers()}
          </section>` : ''}

        ${currentDestination ? `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${getPicturesTemplate()}
              </div>
            </div>
          </section>` : ''}
      </section>` : ''}
    </form>
  </li>`;
};

export default class CreateFormView extends AbstractStatefulView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(allOffers, allDestinations, eventData = BLANK_EVENT) {
    super();
    this._state = CreateFormView.parseEventDataToState(allOffers, allDestinations, eventData);

    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  };

  reset = (tripEvent) => {
    this.updateElement(
      CreateFormView.parseTaskToState(tripEvent),
    );
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);
  };

  setSaveButtonClickHandler = (callback) => {
    this._callback.saveClick = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveButtonClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    this.setDeleteButtonClickHandler(this._callback.deleteClick);
    this.setSaveButtonClickHandler(this._callback.saveClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceInputHandler);
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#startDateChangeHandler
      },
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#endDateChangeHandler
      },
    );
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #eventTypeClickHandler = (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      const eventType = evt.target.value;

      if (eventType !== this._state.type) {
        this.updateElement({type: eventType});
      }
    }
  };

  #eventPriceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: he.encode(evt.target.value),
    });
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(CreateFormView.parseStateToEvent(this._state));
  };

  #saveButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick(CreateFormView.parseStateToEvent(this._state));
  };

  static parseEventDataToState = (allOffers, allDestinations, tripEvent) => ({
    ...tripEvent,
    allOffers: allOffers,
    allDestinations: allDestinations,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToEvent = (state) => {
    const tripEvent = {...state};

    delete tripEvent.allOffers;
    delete tripEvent.allDestinations;
    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;

    return tripEvent;
  };
}

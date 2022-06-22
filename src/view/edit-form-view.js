import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDate, getCurrentOffers, getCurrentDestination } from '../utils/trip-events.js';
import { offerType } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  isFavorite: false,
  destination: null,
  offers: [],
  type: 'taxi'
};

let currentDestination;

const createEditFormTemplate = (state) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    offers,
    allOffers,
    destination,
    allDestinations,
    isDeleting,
    isDisabled,
    isSaving
  } = state;

  const currentOffers = getCurrentOffers(type, allOffers);
  currentDestination = getCurrentDestination(destination?.name, allDestinations);

  const renderEventTypeItems = () => offerType.reduce(((eventTypeTemplate, offer) => (
    eventTypeTemplate += `
    <div class="event__type-item">
      <input id="event-type-${offer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer}" ${(offer === type) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${offer}" for="event-type-${offer}-1">${offer[0].toUpperCase()}${offer.slice(1)}</label>
    </div>`)), '');

  const renderEventOffers = () => currentOffers.offers.reduce(((eventOffersTemplate, offer) => {
    const offerMark = offer.title.split(' ').slice(-1);

    eventOffersTemplate += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerMark}-1" type="checkbox" name="event-offer-${offerMark}" ${offers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offerMark}-1" data-id="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;

    return eventOffersTemplate;
  }), '');

  const getPicturesTemplate = () => currentDestination.pictures.reduce((picturesTemplate, picture) => (
    picturesTemplate += `<img class="event__photo" src=${picture.src} alt=${picture.description}></img>`), '');

  const getDestinationsTemplate = () => allDestinations.reduce((destinationsTemplate, tripDestination) => (
    destinationsTemplate += `<option value="${tripDestination.name}"></option>`), '');

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
            value="${currentDestination ? currentDestination.name : ''}"
            list="destination-list-1"
            ${isDisabled ? 'disabled' : ''} require>
          <datalist id="destination-list-1">
            ${getDestinationsTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </header>
      ${ currentOffers.offers?.length || currentDestination ? `
      <section class="event__details">
        ${currentOffers.offers?.length ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${renderEventOffers()}
            </div>
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

export default class EditFormView extends AbstractStatefulView {
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(allOffers, allDestinations, eventData = BLANK_EVENT) {
    super();
    this._state = EditFormView.parseEventDataToState(allOffers, allDestinations, eventData);

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

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
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
    this.setCloseButtonClickHandler(this._callback.closeClick);
    this.setDeleteButtonClickHandler(this._callback.deleteClick);
    this.setSaveButtonClickHandler(this._callback.saveClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceInputHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destionationListChangeHandler);
    this.element.querySelectorAll('.event__offer-label').forEach((label) => {
      label.addEventListener('click', this.#offerClickHandler);
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        maxDate: this._state.dateTo,
        enableTime: true,
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
        minDate: this._state.dateFrom,
        enableTime: true,
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
        this.updateElement({type: eventType, offers: []});
      }
    }
  };

  #eventPriceInputHandler = (evt) => {
    this._setState({
      basePrice: Math.abs(Number(evt.target.value))
    });
  };

  #destionationListChangeHandler = (evt) => {
    const destinations = this._state.allDestinations.map((destination) => destination.name);

    if (!destinations.includes(evt.target.value)) {
      evt.target.value = '';
    }

    this.updateElement({destination: {name: evt.target.value}});
  };

  #offerClickHandler = (evt) => {
    const clickedOffer = Number(evt.currentTarget.dataset.id);
    let updatedOffers;

    if (this._state.offers.includes(clickedOffer)) {
      const index = this._state.offers.indexOf(clickedOffer);

      updatedOffers = [
        ...this._state.offers.slice(0, index),
        ...this._state.offers.slice(index + 1)
      ];
    } else {
      updatedOffers = [...this._state.offers, clickedOffer];
    }

    this.updateElement({offers: updatedOffers});
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.parseStateToEvent(this._state));
  };

  #saveButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick(EditFormView.parseStateToEvent(this._state));
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
    const tripEvent = {...state, destination: currentDestination};

    delete tripEvent.allOffers;
    delete tripEvent.allDestinations;
    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;
    delete tripEvent.isDeleting;

    return tripEvent;
  };
}

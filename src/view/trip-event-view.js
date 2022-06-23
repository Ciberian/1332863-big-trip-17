import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, padStart, getEventsDuration, getCurrentOffers } from '../utils/trip-events.js';

const TOTAL_MINUTES_IN_HOUR = 60;
const TOTAL_MINUTES_IN_DAY = 1440;

const createTripEventTemplate = (eventData, allOffers) => {
  const { basePrice, dateFrom, dateTo, isFavorite, destination, offers, type } = eventData;
  const currentOffers = getCurrentOffers(type, allOffers);

  const getFormattedDuration = () => {
    const minutes = getEventsDuration(eventData);

    const getRestTime = (restMinutes) => {
      if (restMinutes < TOTAL_MINUTES_IN_HOUR) {
        return `00H ${padStart(restMinutes)}M`;
      }

      if (restMinutes === TOTAL_MINUTES_IN_HOUR) {
        return '01H 00M';
      }

      if (restMinutes > TOTAL_MINUTES_IN_HOUR) {
        return `${padStart(Math.floor(restMinutes/TOTAL_MINUTES_IN_HOUR))}H ${(restMinutes%TOTAL_MINUTES_IN_HOUR) ? padStart(restMinutes%TOTAL_MINUTES_IN_HOUR) : '00'}M`;
      }
    };

    switch(true) {
      case minutes > TOTAL_MINUTES_IN_DAY:
        return `${padStart(Math.floor(minutes/TOTAL_MINUTES_IN_DAY))}D ${getRestTime(minutes%TOTAL_MINUTES_IN_DAY)}`;
      case minutes === TOTAL_MINUTES_IN_DAY:
        return '01D 00H 00M';
      case minutes > TOTAL_MINUTES_IN_HOUR:
        return `${padStart(Math.floor(minutes/TOTAL_MINUTES_IN_HOUR))}H ${(minutes%TOTAL_MINUTES_IN_HOUR) ? padStart(minutes%TOTAL_MINUTES_IN_HOUR) : '00'}M`;
      case minutes === TOTAL_MINUTES_IN_HOUR:
        return '$01H 00M';
      default:
        return `${padStart(minutes)}M`;
    }
  };

  const renderOffers = () => (
    currentOffers.offers.
      filter((offer) => offers.some((id) => id === offer.id)).
      reduce(((offersTemplate, offer) => (
        offersTemplate += `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)), ''));


  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${humanizeEventDate(dateFrom, 'MMMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${humanizeEventDate(dateFrom, 'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${humanizeEventDate(dateTo, 'HH:mm')}</time>
          </p>
          <p class="event__duration">${getFormattedDuration()}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${currentOffers ? `
        <ul class="event__selected-offers">
          ${renderOffers()}
        </ul>` : ''}
        <button class="event__favorite-btn event__favorite-btn${isFavorite ? '--active': ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class TripEventView extends AbstractView {
  #tripEvent = null;
  #allOffers = null;

  constructor(tripEvent, allOffers) {
    super();
    this.#tripEvent = tripEvent;
    this.#allOffers = allOffers;
  }

  get template() {
    return createTripEventTemplate(this.#tripEvent, this.#allOffers);
  }

  setRollupButtonClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
  };

  setFavoriteButtonClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}

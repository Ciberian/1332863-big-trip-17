import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, padStart } from '../util.js';
import dayjs from 'dayjs';

const createTripEventTemplate = (eventData, currentOffers) => {
  const { basePrice, dateFrom, dateTo, isFavorite, destination, type } = eventData;

  const getEventDuration = () => {
    const date1 = dayjs(dateTo);
    const date2 = dayjs(dateFrom);
    const minutes = Math.abs(date1.diff(date2, 'minute'));

    const getRestTime = (restMinutes) => {
      if (restMinutes < 60) {
        return `00H ${padStart(restMinutes)}M`;
      }

      if (restMinutes === 60) {
        return '01H 00M';
      }

      if (restMinutes > 60) {
        return `${padStart(Math.floor(restMinutes/60))}H ${(restMinutes%60) ? padStart(restMinutes%60) : '00'}M`;
      }
    };

    switch(true) {
      case minutes > 1440:
        return `${padStart(Math.floor(minutes/1440))}D ${getRestTime(minutes%1440)}`;
      case minutes === 1440:
        return '01D 00H 00M';
      case minutes > 60:
        return `${padStart(Math.floor(minutes/60))}H ${(minutes%60) ? padStart(minutes%60) : '00'}M`;
      case minutes === 60:
        return '$01H 00M';
      default:
        return padStart(minutes);
    }
  };

  const renderOffers = () => currentOffers.reduce(((offersTemplate, offer) => (
    offersTemplate += `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`)), '');

  return `<div class="event">
    <time class="event__date" datetime="${dateFrom}">${humanizeEventDate(dateFrom, 'MMMM DD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${humanizeEventDate(dateFrom, 'HH:MM')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${humanizeEventDate(dateFrom, 'HH:MM')}</time>
      </p>
      <p class="event__duration">${getEventDuration()}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${renderOffers()}
    </ul>
    <button class="event__favorite-btn event__favorite-btn${isFavorite ? '--active': ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class TripEventView extends AbstractView {
  #eventData = null;
  #currentOffers = null;

  constructor(eventData, offers) {
    super();
    this.#eventData = eventData;
    this.#currentOffers = offers;
  }

  get template() {
    return createTripEventTemplate(this.#eventData, this.#currentOffers);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}

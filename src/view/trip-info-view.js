import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/trip-events.js';

const createTripInfoTemplate = (tripInfo) => {
  const { firstDestination, secondDestination, lastDestination, startDate, endDate, totalPrice, isOnlyOneEvent, isOnlyTwoEvents } = tripInfo;

  const getTripInfoTitle = () => {
    if ((isOnlyOneEvent) ||
        (isOnlyTwoEvents && firstDestination === lastDestination) ||
        (firstDestination === secondDestination && secondDestination === lastDestination)) {
      return firstDestination;
    }

    if (isOnlyTwoEvents) {
      return `${firstDestination} &mdash; ${lastDestination}`;
    }

    if (firstDestination && secondDestination && lastDestination) {
      return `${firstDestination} &mdash; ${secondDestination} &mdash; ${lastDestination}`;
    }

    if (firstDestination && lastDestination ) {
      return `${firstDestination} ... ${lastDestination}`;
    }

    return '';
  };

  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${getTripInfoTitle()}
      </h1>

      <p class="trip-info__dates">${humanizeEventDate(startDate, 'MMM DD')} &nbsp;&mdash;&nbsp; ${humanizeEventDate(endDate, 'MMM DD')}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};

export default class TripInfoView extends AbstractView {
  #tripInfo = null;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }

  get template() {
    return createTripInfoTemplate(this.#tripInfo);
  }
}

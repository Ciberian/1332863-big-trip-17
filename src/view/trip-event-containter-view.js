import AbstractView from '../framework/view/abstract-view.js';

const createTripEventContainerTemplate = () => '<li class="trip-events__item"></li>';

export default class TripEventContainerView extends AbstractView {
  get template() {
    return createTripEventContainerTemplate();
  }
}

import { createElement } from '../render.js';

const createTripEventContainerTemplate = () => '<li class="trip-events__item"></li>';

export default class TripEventContainerView {
  getTemplate() {
    return createTripEventContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

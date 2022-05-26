import AbstractView from '../framework/view/abstract-view.js';

const messages = [
  'Click New Event to create your first point',
  'There are no past events now',
  'There are no future events now'
];

const getMessage = (filterType) => {
  switch (filterType) {
    case 'Everything':
      return messages[0];
    case 'Past':
      return messages[1];
    case 'Future':
      return messages[2];
    default:
      return messages[0];
  }
};

const createEmptyListMessage = (filterType) => `<p class="trip-events__msg">${getMessage(filterType)}</p>`;

export default class TripInfoView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListMessage(this.#filterType);
  }
}

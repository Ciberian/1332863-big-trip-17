import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = [];
  #offers = [];
  #destinations = [];

  constructor(eventsApiService) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events () {
    return this.#events;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      const events = await this.#eventsApiService.getEvents();
      this.#offers = await this.#eventsApiService.getAllOffers();
      this.#destinations = await this.#eventsApiService.getAllDestinations();
      this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateEvent = async (updateType, update) => {
    const index = this.#events.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    const response = await this.#eventsApiService.updateEvent(update);
    const updatedEvent = this.#adaptToClient(response);
    this.#events = [
      ...this.#events.slice(0, index),
      updatedEvent,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, updatedEvent);
  };

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [...this.#events, newEvent];

      this._notify(updateType, newEvent);

    } catch(err) {
      throw new Error('Can\'t add event');
    }
  };

  deleteEvent = async (updateType, update) => {
    const index = this.#events.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, update);

    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptToClient = (tripEvent) => {
    const adaptedEvent = {
      ...tripEvent,
      basePrice: tripEvent['base_price'],
      dateFrom: tripEvent['date_from'],
      dateTo: tripEvent['date_to'],
      isFavorite: tripEvent['is_favorite']
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  };
}

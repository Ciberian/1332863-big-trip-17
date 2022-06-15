import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  getAllOffers = ()  => this._load({url: 'offers'}).then(ApiService.parseResponse);

  getAllDestinations = ()  => this._load({url: 'destinations'}).then(ApiService.parseResponse);

  updateEvent = async (tripEvent) => {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  addEvent = async (tripEvent) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(tripEvent),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deleteEvent = async (tripEvent) => {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (tripEvent) => {
    const adaptedEvent = {
      ...tripEvent,
      'base_price': tripEvent.basePrice,
      'date_from': tripEvent.dateFrom,
      'date_to': tripEvent.dateTo,
      'is_favorite': tripEvent.isFavorite
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  };
}

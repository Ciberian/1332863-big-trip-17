export default class OffersModel {
  #eventsApiService = null;
  #destinations = [];

  constructor(eventsApiService) {
    this.#eventsApiService = eventsApiService;
  }

  get destinations () {
    return this.#destinations;
  }

  init = async (film) => {
    try {
      this.#destinations = await this.#eventsApiService.getComments(film);
    } catch(err) {
      this.#destinations = [];
    }
  };
}

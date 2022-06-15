export default class OffersModel {
  #eventsApiService = null;
  #offers = [];

  constructor(eventsApiService) {
    this.#eventsApiService = eventsApiService;
  }

  get offers () {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#eventsApiService.getAllOffers();
    } catch(err) {
      this.#offers = [];
    }
  };
}

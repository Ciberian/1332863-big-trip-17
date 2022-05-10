import { generatePoint } from '../mock/point.js';
import { generateOffer } from '../mock/offer.js';

const POINTS_AMOUNT = 18;
const OFFERS_AMOUNT = 10;

export default class FilmsModel {
  #points = Array.from({length: POINTS_AMOUNT}, () => generatePoint(POINTS_AMOUNT));
  #offers = Array.from({length: OFFERS_AMOUNT}, generateOffer);

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}

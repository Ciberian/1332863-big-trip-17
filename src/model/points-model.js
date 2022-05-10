import { generatePoint } from '../mock/point.js';
import { generateOffer } from '../mock/offer.js';

const POINTS_AMOUNT = 8;
const OFFERS_AMOUNT = 3;

export default class PointsModel {
  #points = Array.from({length: POINTS_AMOUNT}, generatePoint);
  #offers = Array.from({length: OFFERS_AMOUNT}, generateOffer);

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}

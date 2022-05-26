import { generatePoint } from '../mock/point.js';
import { getOffers } from '../mock/offer.js';

const POINTS_AMOUNT = 5;

export default class PointsModel {
  #points = Array.from({length: POINTS_AMOUNT}, generatePoint);
  #offers = getOffers();

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}

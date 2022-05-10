import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { getDestination } from './destination.js';
import { offerType } from '../const.js';

const generateOfferIds = () => {
  const randomOfferIds = [];
  while (randomOfferIds.length < getRandomInteger(0, 4)) {
    randomOfferIds.push(getRandomInteger(1, 6));
  }

  const uniqOfferIds = new Set(randomOfferIds);
  return [...uniqOfferIds];
};

let pointId = 0;
export const generatePoint = (offersAmount) => ({
  id: ++pointId,
  basePrice: getRandomInteger(50, 1000),
  dateFrom: `2022-07-${getRandomInteger(1, 29)}T${getRandomInteger(0, 23)}:${getRandomInteger(0, 59)}:56.845Z`,
  dateTo: `2022-07-${getRandomInteger(1, 29)}T${getRandomInteger(0, 23)}:${getRandomInteger(0, 59)}:56.845Z`,
  destination: getDestination(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateOfferIds(offersAmount),
  type: getRandomArrayElement(offerType)
});

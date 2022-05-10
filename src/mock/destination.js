import { getRandomArrayElement } from '../util.js';
import { destinations } from '../const.js';

export const getDestination = () => getRandomArrayElement(destinations);

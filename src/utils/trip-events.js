import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
dayjs.extend(isSameOrAfter);

const humanizeEventDate = (releaseDate, formatType) => dayjs(releaseDate).format(formatType);
const isFutureEvent = (eventDate) => eventDate && dayjs().isSameOrAfter(eventDate, 'D');
const isPastEvent = (eventDate) => eventDate && dayjs().isBefore(eventDate, 'D');
const getEventsDuration = (tripEvent) => dayjs(tripEvent.dateFrom).diff(dayjs(tripEvent.dateTo));

const getCurrentOffers = (eventData, allOffers) => {
  const { offers: offerIds, type: offerType } = eventData;
  const currentOffers = allOffers.find((offer) => offer.type === offerType);

  return currentOffers.offers.filter(({ id }) => offerIds.some((offerId) => offerId === id));
};

const padStart = (number) => (number < 10) ? String(number).padStart(2, '0') : number;

export { humanizeEventDate, isFutureEvent, isPastEvent, getEventsDuration, getCurrentOffers, padStart };

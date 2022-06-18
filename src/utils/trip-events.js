import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
dayjs.extend(isSameOrBefore);

const humanizeEventDate = (eventDate, formatType) => dayjs(eventDate).format(formatType);
const isFutureEvent = (dateFrom, dateTo) => dayjs().isSameOrBefore(dateFrom, 'D') || (dayjs().isAfter(dateFrom, 'D') && dayjs().isBefore(dateTo, 'D'));
const isPastEvent = (dateFrom, dateTo) => dayjs().isAfter(dateTo, 'D') || (dayjs().isAfter(dateFrom, 'D') && dayjs().isBefore(dateTo, 'D'));
const getEventsDuration = (tripEvent) => dayjs(tripEvent.dateTo).diff(dayjs(tripEvent.dateFrom), 'minute');

const getCurrentOffers = (eventData, allOffers) => {
  const { offers: offerIds, type: offerType } = eventData;
  const currentOffers = allOffers.find((offer) => offer.type === offerType);

  return currentOffers.offers.filter(({ id }) => offerIds.some((offerId) => offerId === id));
};

const padStart = (number) => (number < 10) ? String(number).padStart(2, '0') : number;

export { humanizeEventDate, isFutureEvent, isPastEvent, getEventsDuration, getCurrentOffers, padStart };

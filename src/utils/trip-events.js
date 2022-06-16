import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
dayjs.extend(isSameOrAfter);

const humanizeEventDate = (releaseDate, formatType) => dayjs(releaseDate).format(formatType);
const isFutureEvent = (eventDate) => eventDate && dayjs().isSameOrAfter(eventDate, 'D');
const isPastEvent = (eventDate) => eventDate && dayjs().isBefore(eventDate, 'D');

const padStart = (number) => (number < 10) ? String(number).padStart(2, '0') : number;

export { humanizeEventDate, isFutureEvent, isPastEvent, padStart };

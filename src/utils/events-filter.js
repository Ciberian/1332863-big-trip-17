import { FilterType } from '../const';
import { isFutureEvent, isPastEvent } from './trip-events';

const eventsFilter = {
  [FilterType.EVERYTHING]: (tripEvents) => tripEvents,
  [FilterType.FUTURE]: (tripEvents) => tripEvents.filter((tripEvent) => isFutureEvent(tripEvent.dateTo)),
  [FilterType.PAST]: (tripEvents) => tripEvents.filter((tripEvent) => isPastEvent(tripEvent.dateFrom))
};

export { eventsFilter };

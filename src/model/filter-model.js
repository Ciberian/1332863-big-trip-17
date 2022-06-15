import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {
  #eventsFilter = FilterType.EVERYTHING;

  get eventsFilter() {
    return this.#eventsFilter;
  }

  setFilter = (updateType, filter) => {
    this.#eventsFilter = filter;
    this._notify(updateType, filter);
  };
}

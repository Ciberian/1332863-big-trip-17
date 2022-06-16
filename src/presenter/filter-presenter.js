import FilterView from '../view/filter-view.js';
import { eventsFilter } from '../utils/events-filter.js';
import { FilterType, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilterPresenter {
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;

  constructor(filterModel, eventsModel) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventsModel.events;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: events.length
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: eventsFilter[FilterType.FUTURE](events).length
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: eventsFilter[FilterType.PAST](events).length
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.eventsFilter);
    this.#filterComponent.setFilterControlClickHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, document.querySelector('.trip-controls__filters'));
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (clickEvt) => {
    const filterType = (clickEvt.target.nodeName === 'INPUT') ? clickEvt.target.value : '';

    if (this.#filterModel.filmsFilter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

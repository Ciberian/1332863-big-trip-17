import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter"
        value="${type}" ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : '' }>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`;
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters.reduce(((filtersTemplate, filter) => filtersTemplate + createFilterItemTemplate(filter, currentFilterType)), '');

  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterControlClickHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterControlClickHandler);
  };

  #filterControlClickHandler = (evt) => {
    this._callback.filterTypeChange(evt.target.textContent.toLowerCase());
  };
}

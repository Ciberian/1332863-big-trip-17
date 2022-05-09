import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render } from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const siteHeaderInfoElement = document.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const siteMainContentElement = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter();

render(new TripInfoView(), siteHeaderInfoElement, 'afterbegin');
render(new FilterView(), siteHeaderFilterElement);
render(new SortView(), siteMainContentElement);

tripEventsPresenter.init(siteMainContentElement);

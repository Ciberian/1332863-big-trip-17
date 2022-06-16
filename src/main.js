import EventsApiService from './events-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const AUTHORIZATION = 'Basic cV7rwU24jkcl5lg5g';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict/';

const siteMainContentElement = document.querySelector('.trip-events');
const eventsApiSevice = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel(eventsApiSevice);
const filterModel = new FilterModel(eventsApiSevice);
const filterPresenter = new FilterPresenter(filterModel, eventsModel);
const tripEventsPresenter = new TripEventsPresenter(siteMainContentElement, eventsModel, filterModel);

filterPresenter.init();
tripEventsPresenter.init();

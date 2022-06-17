import EventsApiService from './events-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const AUTHORIZATION = 'Basic er883jdzbdw32gdsfgdfsg324234';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const siteMainElement = document.querySelector('.trip-events');
const eventsApiSevice = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel(eventsApiSevice);
const filterModel = new FilterModel(eventsApiSevice);
const filterPresenter = new FilterPresenter(filterModel, eventsModel);
const tripEventsPresenter = new TripEventsPresenter(siteMainElement, eventsModel, filterModel);

filterPresenter.init();
tripEventsPresenter.init();
eventsModel.init();

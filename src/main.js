import EventsApiService from './events-api-service.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';

const AUTHORIZATION = 'Basic cV7rwU24jkcl5lg5g';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict/';

const siteMainContentElement = document.querySelector('.trip-events');
const eventsApiSevice = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel(eventsApiSevice);
const offersModel = new OffersModel(eventsApiSevice);
const tripEventsPresenter = new TripEventsPresenter(siteMainContentElement, eventsModel, offersModel);

tripEventsPresenter.init();

import EventsApiService from './events-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsBoardPresenter from './presenter/events-board-presenter.js';

const AUTHORIZATION = 'Basic er883jdzbdw32gdsfgdfsg324234';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const siteMainElement = document.querySelector('.trip-events');
const eventsApiSevice = new EventsApiService(END_POINT, AUTHORIZATION);
const eventsModel = new EventsModel(eventsApiSevice);
const filterModel = new FilterModel(eventsApiSevice);
const filterPresenter = new FilterPresenter(filterModel, eventsModel);
const eventsBoardPresenter = new EventsBoardPresenter(siteMainElement, eventsModel, filterModel);

const handleNewEventButton = () => {
  newEventButton.disabled = false;
};
const handleNewEventButtonClick = () => {
  eventsBoardPresenter.createEvent(handleNewEventButton);
  newEventButton.disabled = true;
};

filterPresenter.init();
eventsBoardPresenter.init();
eventsModel.init().finally(() => {
  newEventButton.addEventListener('click', handleNewEventButtonClick);
});

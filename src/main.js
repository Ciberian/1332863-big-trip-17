import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';

const siteMainContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel;
const tripEventsPresenter = new TripEventsPresenter(siteMainContentElement, pointsModel);

tripEventsPresenter.init();

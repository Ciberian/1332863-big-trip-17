import TripListView from '../view/trip-list-view.js';
import TripEventContainerView from '../view/trip-event-containter-view.js';
import CreationFormView from '../view/creation-form-view.js';
import TripEventView from '../view/trip-event-view.js';
import { render } from '../render.js';

const TRIP_EVENTS_DISPLAYED = 3;

export default class FilmsPresenter {
  tripListComponent = new TripListView();
  tripEventContainerComponent = new TripEventContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.tripListComponent, this.filmsContainer);
    render(this.tripEventContainerComponent, this.tripListComponent.getElement());
    render(new CreationFormView, this.tripEventContainerComponent.getElement());

    for (let i = 0; i < TRIP_EVENTS_DISPLAYED; i++) {
      const tripEventContainerComponent = new TripEventContainerView();
      render(tripEventContainerComponent, this.tripListComponent.getElement());
      render(new TripEventView(), tripEventContainerComponent.getElement());
    }
  };
}

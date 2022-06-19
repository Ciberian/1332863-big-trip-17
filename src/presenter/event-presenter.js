import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { UpdateType, UserAction } from '../const.js';
import { render, remove, replace } from '../framework/render.js';


export default class EventPresenter {
  #tripEvent = null;
  #eventsModel = null;
  #changeData = null;
  #editFormComponent = null;
  #tripEventComponent = null;
  #tripEventContainer = null;

  constructor(eventsModel, container, changeData) {
    this.#eventsModel = eventsModel;
    this.#tripEventContainer = container;
    this.#changeData = changeData;
  }

  init = (tripEvent, offers, destination) => {
    this.#tripEvent = tripEvent;

    const prevEventComponent = this.#tripEventComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#tripEventComponent = new TripEventView(this.#tripEvent, offers);
    this.#editFormComponent = new EditFormView(this.#tripEvent, offers, destination);

    this.#tripEventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEventComponent.setEditButtonClickHandler(this.#handleEditButtonClick);
    this.#editFormComponent.setCloseButtonClickHandler(this.#handleEventButtonClick);
    this.#editFormComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);
    this.#editFormComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this.#tripEventComponent, this.#tripEventContainer);
      return;
    }

    if (this.#tripEventContainer.contains(prevEventComponent.element)) {
      replace(this.#tripEventComponent, prevEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditFormComponent);
  };

  destroy = () => {
    remove(this.#tripEventComponent);
    remove(this.#editFormComponent);
  };

  #replaceEventToEditForm = () => {
    replace(this.#editFormComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditFormToEvent = () => {
    replace(this.#tripEventComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#tripEvent);
      this.#replaceEditFormToEvent();
    }
  };

  #handleEditButtonClick = () => {
    this.#replaceEventToEditForm();
  };

  #handleEventButtonClick = () => {
    this.#replaceEditFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite},
    );
  };

  #handleSaveButtonClick = (tripEvent) => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      tripEvent,
    );
  };

  #handleDeleteButtonClick = (tripEvent) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      tripEvent,
    );
  };
}

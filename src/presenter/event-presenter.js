import TripEventView from '../view/trip-event-view.js';
import EditFormView from '../view/edit-form-view.js';
import { UpdateType, UserAction } from '../const.js';
import { render, remove, replace } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class EventPresenter {
  #eventsModel = null;
  #changeData = null;
  #changeMode = null;
  #tripEventContainer = null;
  #tripEventComponent = null;
  #editFormComponent = null;
  #tripEvent = null;
  #allOffers = [];
  #allDestinations = [];
  #mode = Mode.DEFAULT;

  constructor(eventsModel, container, changeData, changeMode) {
    this.#eventsModel = eventsModel;
    this.#tripEventContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#allOffers = this.#eventsModel.offers;
    this.#allDestinations = this.#eventsModel.destinations;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    const prevEventComponent = this.#tripEventComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#tripEventComponent = new TripEventView(tripEvent, this.#allOffers);
    this.#tripEventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEventComponent.setEditButtonClickHandler(this.#handleEditButtonClick);

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this.#tripEventComponent, this.#tripEventContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEventComponent, prevEditFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEditFormComponent);
  };

  destroy = () => {
    remove(this.#tripEventComponent);
    remove(this.#editFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripEventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
  };

  #replaceEventToForm = () => {
    this.#editFormComponent = new EditFormView(this.#allOffers, this.#allDestinations, this.#tripEvent);
    this.#editFormComponent.setCloseButtonClickHandler(this.#handleEventButtonClick);
    this.#editFormComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);
    this.#editFormComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);

    replace(this.#editFormComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#tripEventComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleEditButtonClick = () => {
    this.#replaceEventToForm();
  };

  #handleEventButtonClick = () => {
    this.#replaceFormToEvent();
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
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      tripEvent,
    );
  };

  #handleDeleteButtonClick = (tripEvent) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      tripEvent,
    );
  };
}

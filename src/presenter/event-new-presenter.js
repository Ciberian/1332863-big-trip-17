import { remove, render, RenderPosition } from '../framework/render.js';
import CreateFormView from '../view/create-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventNewPresenter {
  #eventsModel = null;
  #eventListContainer = null;
  #changeData = null;
  #createFormComponent = null;
  #destroyCallback = null;

  constructor(eventModel, eventListContainer, changeData) {
    this.#eventsModel = eventModel;
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#createFormComponent !== null) {
      return;
    }
    this.#createFormComponent = new CreateFormView(this.#eventsModel.offers, this.#eventsModel.destinations);
    this.#createFormComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);
    this.#createFormComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);

    render(this.#createFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#createFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#createFormComponent);
    this.#createFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#createFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#createFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#createFormComponent.shake(resetFormState);
  };

  #handleSaveButtonClick = (tripEvent) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      tripEvent,
    );
  };

  #handleDeleteButtonClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

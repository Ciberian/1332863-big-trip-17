import { remove, render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #editFormComponent = null;
  #destroyCallback = null;
  #isNewEvent = true;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EditFormView();
    this.#editFormComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);
    this.#editFormComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);

    render(this.#editFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
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

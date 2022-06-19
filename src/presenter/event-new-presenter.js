// const createEventBtn = document.querySelector('.trip-main__event-add-btn');

// const addCreateForm = (eventData, offersData) => {
//   const createFormContainerComponent = new TripEventContainerView();
//   const createFormComponent = new EditFormView(eventData, offersData);
//   render(createFormContainerComponent, document.querySelector('.trip-events__list'), 'AFTERBEGIN');
//   render(createFormComponent, createFormContainerComponent.element);
//   createEventBtn.disabled = true;
// };

import { remove, render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #editFormComponent = null;
  #destroyCallback = null;

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
    this.#editFormComponent.setDeleteButtonClickHandler(this.#handleDeleteButtonClick);
    this.#editFormComponent.setSaveButtonClickHandler(this.#handleSaveButtonClick);

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

  #deleteEditForm = () => {
    remove(this.#editFormComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #addEditForm = () => {
    render(this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleNewEventButtonClick = () => {
    this.#addEditForm();
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

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      task,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

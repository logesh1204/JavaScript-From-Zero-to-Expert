import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _errorMessage = 'No recipes found for your query ,Please try again!';
  _message = '';

  renderSpinner() {
    const markUp = `
            <div class="spinner">
              <svg>
                <use href="${icons}}#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentEl.innerHTML = markUp;
  }
  renderError(message = this._errorMessage) {
    const markUp = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentEl.innerHTML = markUp;
  }
  renderMessage(message = this._message) {
    const markUp = `
            <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.innerHTML = markUp;
  }
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    // console.log('render : ', data);
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const currEl = Array.from(this._parentEl.querySelectorAll('*'));
    const newEl = Array.from(newDOM.querySelectorAll('*'));

    newEl.forEach((newEl, i) => {
      const curEl = currEl[i];

      // update text Content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
}

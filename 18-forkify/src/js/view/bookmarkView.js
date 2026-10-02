import preview from './preview';
import View from './view';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(res => preview.render(res, false)).join('');
  }
}

export default new BookmarkView();

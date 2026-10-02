// import { search } from 'core-js/fn/symbol';

class SearchView {
  _paraentEl = document.querySelector('.search');

  getQuery() {
    const query = this._paraentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._paraentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._paraentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      // console.log('addHandlerSearch called ');
      handler();
    });
  }
}

export default new SearchView();

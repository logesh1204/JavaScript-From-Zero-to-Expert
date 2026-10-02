import View from './view';
import preview from './preview';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query ,Please try again!';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(res => preview.render(res, false)).join('');
  }
}

export default new ResultsView();

import { COLUMNS, ROWS, MAX, MIN, TOTALVALUES } from "./config.js";
class Model {
  _boardValue = [];
  _markedValue = [];
  currentMarkedValue;
  getRandomValue() {
    return Math.floor(Math.random() * (MAX - MIN + 1) + MIN) + 1;
  }

  generateBoardvalue() {
    let tempBoardValue = [];
    while (tempBoardValue.length < TOTALVALUES) {
      let value = this.getRandomValue();
      if (!tempBoardValue.includes(value)) {
        tempBoardValue.push(value);
      }
    }
    for (let i = 0; i < tempBoardValue.length; i += COLUMNS) {
      this._boardValue.push(tempBoardValue.slice(i, i + COLUMNS));
    }
  }
  async generateMarkedvalue() {
    const value = this.getRandomValue();
    if (this._markedValue.length === TOTALVALUES) {
      return null;
    }
    if (this._markedValue.includes(value)) {
      return this.generateMarkedvalue();
    }
    this._markedValue.push(value);
    return value;
  }
  getBoardvalue() {
    return this._boardValue;
  }
  getMarkedValue() {
    return this._markedValue;
  }
  async checkMarkedStatus(data) {
    this.currentMarkedValue = Array.from(data);
    const result =
      this.checkRows() || this.checkColumns() || this.checkdiagonal();

    return result;
  }
  checkRows() {
    for (let i = 0; i < ROWS; i++) {
      let row = this.currentMarkedValue.filter((el) => +el.dataset.row === i);
      if (row.every((el) => el.classList.contains("marked"))) {
        return true;
      }
    }
  }
  checkColumns() {
    for (let i = 0; i < COLUMNS; i++) {
      let columns = this.currentMarkedValue.filter(
        (el) => +el.dataset.column === i,
      );
      console.log(columns.every((el) => el.classList.contains("marked")));
      if (columns.every((el) => el.classList.contains("marked"))) {
        return true;
      }
    }
  }
  checkdiagonal() {
    const leftDiagonal = this.currentMarkedValue
      .filter((el) => +el.dataset.row === +el.dataset.column)
      .every((el) => el.classList.contains("marked"));
    const rightDiagonal = this.currentMarkedValue
      .filter((el) => +el.dataset.row + +el.dataset.column === ROWS - 1)
      .every((el) => el.classList.contains("marked"));
    if (leftDiagonal || rightDiagonal) {
      return true;
    }
  }
  reset() {
    this._boardValue = [];
    this._markedValue = [];
    this.currentMarkedValue = [];
  }
}
export default new Model();

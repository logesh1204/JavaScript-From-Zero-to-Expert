import { COLUMNS, ROWS, TOTALVALUES } from "./config.js";
class View {
  _parentEl = document.querySelector(".container-body");
  _start = document.querySelector(".start-btn");
  _next = document.querySelector(".next-btn");
  _seconds = document.querySelector(".seconds");
  _number = document.querySelector(".number");
  restart = document.querySelector(".restart");
  _data;
  intervalId;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  renderSeconds(seconds) {
    this._seconds.innerHTML = `${seconds}s`;
  }
  renderMarked(value) {
    this._number.innerHTML = value;
  }
  renderSuccess() {
    const markup = `<div class="bingo-success ">
            <div class="greetings">
              <h3>BINGO</h3>
              <p>Congratulations on winning the game!</p>
            </div>
            
          </div>`;
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  renderfaliure() {
    const markup = `<div class="bingo-failure">
            <div class="greetings">
              <h2>GAME OVER</h2>
              
            </div>
        </div>`;
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  addHandler(handler) {
    window.addEventListener("load", handler);
  }
  toggleClass() {
    this._start.classList.toggle("hidden");
    this._next.classList.toggle("hidden");
  }
  addHandlerStart(handler) {
    this._start.addEventListener("click", () => {
      this.toggleClass();
      handler();
    });
    this._next.addEventListener("click", handler);
  }
  addHandlerRestart(handler) {
    this.restart.addEventListener("click", handler);
  }
  getMarkedList() {
    return this._parentEl.querySelectorAll(".bingo-cell");
  }
  addHandlerMarked(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const cell = e.target.closest(".bingo-cell");
      // if (Number(this._number.textContent) !== Number(cell.textContent)) return;
      cell.classList.toggle("marked");
      handler();
    });
  }
  _generateMarkup() {
    let html = "";
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        html += `<span class="bingo-cell" data-row='${i}' data-column='${j}'>${this._data[i][j]}</span>`;
      }
    }
    return html;
  }
  clear() {
    this._parentEl.innerHTML = "";
  }
}

export default new View();

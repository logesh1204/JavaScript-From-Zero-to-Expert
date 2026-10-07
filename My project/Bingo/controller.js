import { TOTALVALUES } from "./config.js";
import model from "./model.js";
import view from "./view.js";

const controlBorad = function () {
  model.generateBoardvalue();
  view.render(model.getBoardvalue());
};

const setTimer = function () {
  let timer = 10;

  return function () {
    timer--;
    // console.log(timer);
    return timer;
  };
};
const controlBingoMarked = async function () {
  let timer = setTimer();
  console.log(model.getMarkedValue().length);
  if (model.getMarkedValue().length === TOTALVALUES) {
    controlMarked();
  }
  view.renderSeconds(10);
  let value = await model.generateMarkedvalue();
  if (value === null) {
    clearInterval(view.intervalId);
    return;
  }
  view.renderMarked(value);
  clearInterval(view.intervalId);
  view.intervalId = setInterval(function () {
    const seconds = timer();
    if (seconds === 0) {
      clearInterval(view.intervalId);
      controlBingoMarked();
      return;
    }
    view.renderSeconds(seconds);
  }, 1000);
};

const controlMarked = async function () {
  const marked = view.getMarkedList();
  let result = await model.checkMarkedStatus(marked);
  console.log("win : ", result);
  if (result) {
    view.renderSuccess();
    clearInterval(view.intervalId);
  }
  if (model.getMarkedValue().length === TOTALVALUES && result !== true) {
    view.renderfaliure();
    clearInterval(view.intervalId);
  }
};

const restart = function () {
  model.reset();
  view.renderMarked(0);
  view.renderSeconds(0);
  view.toggleClass();
  clearInterval(view.intervalId);
  controlBorad();
};
const init = function () {
  view.addHandler(controlBorad);
  view.addHandlerStart(controlBingoMarked);
  view.addHandlerMarked(controlMarked);
  view.addHandlerRestart(restart);
};
init();

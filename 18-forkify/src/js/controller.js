import * as model from './model.js';
import bookmarkView from './view/bookmarkView.js';
import paginationView from './view/pagination.js';
import recipeView from './view/recipeView.js';
import resultsView from './view/resultsView.js';
import searchView from './view/searchView.js';
import addRecipeView from './view/addRecipeView.js';
import 'core-js/stable';
import { MODAL_CLOSE_SEC } from './config.js';
import 'regenerator-runtime/runtime';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}
//Loading a Recipe from API
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //Loading a Recipe From Api
    await model.loadRecipe(id);

    //Rendering the Recipe
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    resultsView.update(model.getSearchResults());
    bookmarkView.update(model.state.bookmark);
  } catch (err) {
    //console.error(err);
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    resultsView.renderSpinner();
    // load search
    await model.loadSearch(query);
    console.log(model.state.search.results);
    // render search
    resultsView.render(model.getSearchResults());

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  // render search
  resultsView.render(model.getSearchResults(goToPage));

  // render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  //update recipe serving
  model.updateServing(newServing);
  console.log(model.state.recipe);

  // update render view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmark);
};
const controlBookmarksRender = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRcipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRcipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmark);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
// Listening For load and hashchange Events
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarksRender);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

import { async } from 'regenerator-runtime';
import { AJAX } from './helper';
import { API_URL, RESULTS_PER_PAGE, KEY } from './config';
// import { search } from 'core-js/fn/symbol';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmark: [],
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    sourceUrl: recipe.source_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmark.some(el => id === el.id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    // console.log('model: ', state.search);
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    // new Qt = old Qt * newServing/old servings
  });

  state.recipe.servings = newServing;
};

const presistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};
export const addBookmark = function (recipe) {
  // add recipe to bookmark
  state.bookmark.push(recipe);

  // mark as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  presistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => id === el.id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  presistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmark = JSON.parse(storage);
};
init();
const clearBookmark = function () {
  localStorage.clear('bookmarks');
};
// clearBookmark()

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! please use the correct format',
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};

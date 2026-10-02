/* -------------------------- Exporting and Importing in ES Modules ------------------------------- */

// Importing Module

// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 10);
// console.log(price, tq);

// import all for shopping cart
/* import * as shoppingCart from './shoppingCart.js';
console.log('Importing Module ');
shoppingCart.addToCart('Tea', 12);
console.log(shoppingCart.totalPrice, shoppingCart.tq); */

// default and named can add both but not recommend
import add, { cart } from './shoppingCart.js';
add('pizza', 4);
add('bread', 9);
add('apples', 7);

console.log(cart);

/* -------------------------- Top-Level await (ES) ------------------------------- */

/* console.log('Starting fetch');
const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
const postsRes = await posts.json();
console.log(postsRes);
console.log('Ending fetch'); */

const lastPost = async function () {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await posts.json();
  console.log(data);
  return { title: data.at(-1).title, body: data.at(-1).body };
};

const post = async () => await lastPost();
console.log(post);

/* -------------------------- The Module Pattern ------------------------------- */

const shoppingCart2 = (function () {
  const shippingCost = 10;
  const cart = [];
  const totalPrice = 237;
  const toatlQuantity = 27;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart shipping cost is ${shippingCost}`,
    );
  };
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    totalPrice,
    toatlQuantity,
    cart,
    addToCart,
    orderStock,
  };
})();

console.log(shoppingCart2);
shoppingCart2.addToCart('bread', 5);
shoppingCart2.addToCart('tea', 5);
console.log('shoppingCart2.shippingCost : ', shoppingCart2.shippingCost);
console.log('shoppingCart2.cart : ', shoppingCart2.cart);
console.log(shoppingCart2);

/* -------------------------- CommonJS Modules ------------------------------- */

// Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// import
//  const {addToCart } = require('./shoppingCart.js');

/* -------------------------- Introduction to NPM ------------------------------- */
//
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);

state.user.loggedIn = false;
const stateDeepClone = cloneDeep(state);
state.cart[0].product = 'tea';
console.log(stateClone);

console.log(stateDeepClone);

/* -------------------------- Bundling With Parcel and NPM Scripts ------------------------------- */

// npm i parcel --save-dev
//npx parcel index.html
if (module.hot) {
  module.hot.accept();
}

/* -------------------------- Configuring Babel and Polyfilling  ------------------------------- */
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
// import 'regenerator-runtime/runtime'; not installed

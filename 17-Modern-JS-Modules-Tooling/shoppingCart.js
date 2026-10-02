//  Exporting Module
console.log('Exporting Module');

// Blocking Code
// console.log('Starting fetch');
// const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
// const postsRes = await posts.json();
// console.log(postsRes);
// console.log('Ending fetch');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const toatlQuantity = 27;

// Named Export
export { totalPrice, toatlQuantity as tq };

// default Export
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

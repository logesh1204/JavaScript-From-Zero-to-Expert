'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '18:02',
    address,
  }) {
    console.log(
      `Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (i1, i2, i3) {
    console.log(` Here yor declicious pasta with ${i1},${i2} and ${i3}`);
  },
  orderPizza: function (mainIng, ...others) {
    console.log(mainIng);
    console.log(others);
  },
};

/* ----------- Destructuring Array--------  */

const arr = [2, 543, 34];

const [a, b, c] = arr;
console.log(arr);
console.log(a, b, c);

// we can also custom the sturcturing

// const [first, second] = restaurant.categories;
// console.log(first, second);

/* 
  -by skip the place we can assign value of 3 or more on index
  -in below code it ist and 3rd not the 2nd because skip palce or leave them enpty
*/
let [first, , second] = restaurant.categories;
console.log(first, second);

//Swapping the varaibale
//[second, , first] = restaurant.categories;
[second, , first] = [first, , second];
console.log(first, second);

//function return destructuring
const [Starter, main] = restaurant.order(2, 1);
console.log(Starter, main);

// nested destructuring
let arrNested = [2, 4, [5, 7]];
let [i, , [j, k]] = arrNested;
console.log('Array:', arrNested);
console.log(i, j, k);

//default value
let [p = 1, r = 2, z = 3, w = 4122] = arr;
console.log(p, r, z, w);

/* ------- Destructuring Object -----  */

const user = { fname: 'Alice', age: 25, city: 'Paris' };

// Traditional way
const nameOld = user.fname;
const ageOld = user.age;

// Modern Destructuring
const { fname, age } = user;

console.log(fname); // "Alice"
console.log(age); // 25

//Rename variable
const { name: userName, city: userCity } = user;
console.log(userName); // "Alice"
//////////////////////////////////////////////////
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// rename
const {
  name: restaurantName,
  openingHours: hours,
  categories: tag,
} = restaurant;
console.log(restaurantName, hours, tag);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

// Mutating variables
let a1 = 133;
let b1 = 23493;
const obj = { a1: 89, b1: 12, c1: 46 };
// { a1, b1 } = obj; ->Uncaught SyntaxError: Unexpected token '=' , js treats this as code block so,it show error ,then the is solution :
({ a1, b1 } = obj);

// nested object

const {
  fri: { open, close },
} = openingHours;

console.log('Friday => open:', open, 'close :', close);

// Destructing objent in function

restaurant.orderDelivery({
  time: '20:30',
  adress: 'Via del sole 21',
  starterIndex: 2,
  mainIndex: 2,
});
restaurant.orderDelivery({
  adress: 'Via del sole 21',
  starterIndex: 1,
});

/* ------------ Spread operator (...)-------------- */
/* 
  the spread operator expand or unpack the iterable  into individual element or properties

  iterables : Array ,string,maps, sets,  object( from ES8 20218)
*/
const arr1 = [7, 8, 9];
const oldWay = [1, 2, arr1[0], arr1[1], arr1[2]];
const newWay = [1, 2, ...arr1];

console.log('old way : ', oldWay, '\nNew Way :', newWay);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const menuCopy = [...restaurant.mainMenu];

// merge array 2 or more

const menuJoin = [...restaurant.mainMenu, ...restaurant.starterMenu];

console.log(menuJoin);

//string
console.log(...restaurant.name);

// function call
let ing = ['mushrooms', 'aspargus', 'cheese'];
restaurant.orderPasta(ing[0], ing[1], ing[2]);
restaurant.orderPasta(...ing);

// object
const newRestaurant = { foundedIn: 1999, ...restaurant };
console.log(newRestaurant);
//copy object
const restaurantCopy = { ...restaurant };
// it create new object from the original , it does not point the reference of original
console.log(restaurantCopy);

/*--------------- Rest pattern and paramateres -----------------*/

// spread is in the right of the asignment (=)
const arrSpread = [1, 2, 4, ...[5, 9, 8, 7, 4]];
console.log(arrSpread);
// rest is in the left of the asignment (=)
const [x, y, ...arrRest] = arrSpread;
console.log(x, y, arrRest);

// Rest will have all element form last elment index but not the skip one's and must be in last of destructuring or any
const [pizza, , risotto, ...ohterFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, ohterFood);

// object

const { sat, ...weekdays } = restaurant.openingHours;

console.log(sat, weekdays);

// rest function

function add(...numbers) {
  // pack
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

add(1, 2, 5, 9, 7, 4, 80);
add(1, 7, 4, 8);

const z1 = [25, 56, 59, 48, 78];
add(...z1); // unpack
restaurant.orderPizza('mushrooms', 'onion', 'olives');
restaurant.orderPizza('mushrooms');

/* ------------ Short  Circuiting (&& and ||)---------- */

// OR (||)
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuest = 20;
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
console.log('Guest num 1:', guest1);

const guest2 = restaurant.numGuest || 10;
console.log('Guest num 2:', guest2);

// AND(&&)

console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('hello' && 23 && 12);
console.log('hello' && 23 && null && 'Jonas');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'onion', 'olives');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms1', 'onion', 'olives');

/* ----------------------- Nullish Coalescing (??)-------------------------- */

// Introduced in  ES2020 NUlish undefined or Null

restaurant.newGuest = 0;
const newGuest1 = restaurant.newGuest ?? 10;
console.log('Guest num 1:', newGuest1);

/* ----------------------- Logical Assignment Operator-------------------------- */

const rest1 = {
  name: 'Capri',
  numGuest: null,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Rossi',
};

// old way => rest2.numGuest = rest2.numGuest || 10;
rest2.numGuest ||= 10;
rest1.numGuest = null;
rest1.numGuest ??= 10;

console.log(rest1);
console.log(rest2);

// old way -> rest2.owner = rest2.owner && '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest2);
/* ------------- Looping array : for of loop -------- */

const menuArr = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menuArr) {
  console.log(item);
}
// display item along with index
for (const [i, el] of menuArr.entries()) {
  console.log(`${i + 1} : ${el}`);
}

/* ------------- Enhanced object Literals (3 new enhance)---------- */

const job = 'cook';
const objEnhanced = {
  name: 'Raj Kumar',
  age: 46,
  job, // 1. directly assign variable in object
  summary() {
    // 1. directly assign function in object
    console.log(`${this.name} is ${this.age} years old`);
  },
};
console.log(objEnhanced);

//3
const day = { [7 - 7]: 'mon' };
console.log(day);

/* ------------- Optional Chaining(?.)---------- */

// old way
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// new way (ES2020)

console.log(restaurant.openingHours.mon?.open);
// multiple chaining
console.log(restaurant.openingHours?.mon?.open);

const weekdays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of weekdays1) {
  console.log(
    `On ${day}, , we open at ${restaurant.openingHours[day]?.open ?? 'closed'}`
  );
}

// method
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.order1?.(0, 1) ?? 'Method does not exist');

// array

const users = [{ name: 'Jonas', age: 34 }];
console.log(users[0]?.name ?? 'users is empty');
console.log(users[0]?.email ?? 'empty is empty');

/* ------------ Looping object : object key ,values, and entries ----------- */

// key
const properties = Object.keys(openingHours);

let openString = `we are open on  ${properties.length}  day: `;

for (const d of properties) openString += `${d},`;
console.log(openString);

// values
const propertiesValues = Object.values(openingHours);
console.log(propertiesValues);

// enteries
const propertiesEntries = Object.entries(openingHours);
console.log(propertiesEntries);
for (const [i, { open: o, close: c }] of propertiesEntries) {
  console.log('day : ', i, ' open :', o, ' close : ', c);
}

/* ------------------- sets---------------------------- */

let set = new Set([1, 2, 34, 5]);
console.log(set);
set.add([22, 33, 89]);
console.log(set);
console.log(set.size);
console.log(set.has(34));
console.log(set.has(35));
set.delete(5);
console.log(set);

for (const s of set) console.log(s);

console.log(set.values());
console.log(set.values().next().value);
console.log(...set);
console.log([...set][2]);

const numberArray = [1, 2, 3, 4, 5, 6, 5, 4, 34, 7, 8, 90, 10];

const numberSet = new Set(numberArray);
console.log(numberSet);

console.log(new Set('jonasschmedtmann'));
console.log(new Set('jonasschmedtmann').size);

/* -------------------- New opertion to make sets useful----------------------------- */

// Interssection
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('intersection :', commonFoods);
console.log([...commonFoods]);

// union
const foodsFusion = italianFoods.union(mexicanFoods);
console.log('union', foodsFusion);

// difference

const differenceItalianFoods = italianFoods.difference(mexicanFoods);
console.log(differenceItalianFoods);

const differenceMexicanFoods = mexicanFoods.difference(italianFoods);
console.log(differenceMexicanFoods);

// symmetricDifference
const foods = italianFoods.symmetricDifference(mexicanFoods);
console.log(foods);

console.log(italianFoods.isDisjointFrom(mexicanFoods));

/* ------------------------Maps : Fundamentals-------------------------   */

const rest = new Map();
rest.set('name', 'Taj Mahal');
rest.set('categories', ['tea', 'coffee']);
rest
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open :D')
  .set('1', 'we are open :D')
  .set(false, 'e are Closed :(');
console.log(rest);
console.log(rest.get('name'));
console.log(rest.get('open'));

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete('1');
console.log(rest);
// rest.clear();
console.log(rest.size);

const arRest = [2, 3];
rest.set([1, 2], 'test1');
console.log(rest.get([1, 2]));
rest.set(arRest, 'Test2');
console.log(rest.get(arRest));

/* ---------------------- Maps iteration ----------------------------- */

const question = new Map([
  ['question', 'what is the best programming language in te world'],
  [1, 'C'],
  [2, 'Python'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct answer'],
  [false, 'Wrong Answer,Try again'],
]);
console.log(question);

// convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
console.log(question.get('question'));
for (const [key, values] of question) {
  if (typeof key === 'number') {
    console.log(`Option ${key} : ${values}`);
  }
}
const answer = 2; // use prompt to get dynamic values
console.log(question.get(answer === question.get('correct')));

//convert map to array
console.log(...question);
console.log(question.entries());
console.log(...question.keys());
console.log(...question.values());

/* -------------------------- working with string  Part 1 ----------------------------------------- */

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.table([...airline]);
console.log(plane[1]);
console.log(plane[2]);
console.log(plane[0]);
console.log('8735'[2]);

// index of
console.log(airline.indexOf('i'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal'));

// length
console.log(airline.length);

// slice
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // to remove space
console.log(airline.slice(-3));
console.log(airline.slice(1, -3));

const checkMiddleSeat = function (seat) {
  // plane has 6 seat ABC(left side) DEF(right side)
  let s = seat.slice(-1);
  if (s === 'E' || s === 'B') {
    console.log('You got the middle seat');
  } else {
    console.log('you got lucky');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('43C');
checkMiddleSeat('10E');

// string convert to string object before methods process and after the process again sring object is convert to string
console.log(new String('hello world'));
console.log(typeof new String('hello world'));

console.log(typeof new String('hello world').slice(1));
/* -------------------------- working with string  Part 2 ----------------------------------------- */

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//capitalization the name
const passenger = 'JoNaS';
const passengerLower = passenger.toLowerCase();
const correctName = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(correctName);

const email = 'hello@jonas.io';
const loginEmail = ' HellO@JoNAs.Io  \n';

const lowerEmail = loginEmail.toLowerCase();
const trimEmail = lowerEmail.trim();
console.log(trimEmail);

// better way
// we get new string form lower functio and use that in trime function
const newloginEmail = loginEmail.toLowerCase().trim();
console.log(newloginEmail);

console.log(email === newloginEmail, email === trimEmail);

//replace
const priceGB = '288,97E'; // E is pound symbol
const priceUS = priceGB.replace('E', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // only first occurrence
console.log(announcement.replace(/door/g, 'gate')); // for all occurrence

// Boolean

const newPlane = 'Airbus A320neo';

console.log(newPlane.includes('A320'));
console.log(newPlane.includes('Boeing'));
console.log(newPlane.startsWith('Air'));

if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

const checkBaggage = function (item) {
  const baggage = item.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed to aboard');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop,some Food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got Some snacks and a gun for protection');
/* -------------------------- working with string  Part 3 ----------------------------------------- */

// split
console.log('I have a laptop,some Food and a pocket knife'.split(' '));

const [firstName, lastName] = 'Jaya Kumar'.split(' ');

let zSplit = 'I have a laptop,some Food and a pocket knife'.split(' ');

// join
const zJoin = zSplit.join(',');
console.log(zJoin);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const nameCapitalize = [];
  for (const n of names) {
    nameCapitalize.push(n[0].toUpperCase() + n.slice(1));
    // other way => n.replace(n[0],n[0].toUpperCase)
  }
  console.log(nameCapitalize.join(' '));
};

capitalizeName('I have a laptop, some Food and a pocket knife');

// padding
const message = 'hello World';
console.log(message.padStart(25, '_ '));
console.log(message.padEnd(25, '_ '));

const maskCreditCard = function (number) {
  const str = number + ''; // string(number)
  const last4digits = str.slice(-4);

  console.log(last4digits.padStart(str.length, '*'));
};

maskCreditCard(6365150131);
maskCreditCard(636515013124);

//repeat

const alert = 'Bad Weather .. All Departures Delayed...  \n';

console.log(alert.repeat(5));

const status = function (n) {
  console.log(` There are ${n} planes are line ${'🛬'.repeat(n)}`);
};

status(6);
status(15);
/* -------------------------- String Methods pratices ----------------------------------------- */
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
  const [message, from, to, time] = flight.split(';');

  console.log(
    `${message.startsWith('_Delayed') ? '🔴' : ''}${message.replaceAll(
      '_',
      ' '
    )} from ${from.slice(0, 3).toUpperCase()} to ${to
      .slice(0, 3)
      .toUpperCase()} (${time.replace(':', 'h')})`.padStart(44)
  );
}

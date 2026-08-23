'use strict';
function log(...value) {
  console.log(...value);
}

/* -------------------- Default Parameters ------------------------- */

const bookings = [];

const creayeBooking = function (
  flightNum,
  numpassengers = 1,
  price = 199 * numpassengers /* ES6 */
) {
  //   ES5
  //   numpassengers = numpassengers || 1;
  //   price = price || 199;
  const booking = { flightNum, numpassengers, price };
  log(booking);
  bookings.push(booking);
};

creayeBooking('LH238');
creayeBooking('LH248', 2, 800);
creayeBooking('LH248', 5);
// we can't skip any argument while passing in the function so instead of skipping argument we can give that as undefined(it take default value);
creayeBooking('LH248', undefined, 1000);

/* --------------------  How Passing Arguments Works: Value vs. Reference ------------------------- */

const flight = 'LH234';
const jonas = { name: 'Jonas Schmedtmann', passport: 2344668345 };

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr . ' + passenger.name;
  if (passenger.passport === 2344668345) {
    console.log('Checked In');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, jonas);
log(flight);
log(jonas);

/* 
-   JavaScript is pass-by-value. For objects, the value being passed is a reference to the object.
-   The problem is that multiple functions can mutate the same original object. so, You may not know which function changed what, when it changed, or what the original value was.
-    That's why this can become difficult in a large application with many functions and developers.
*/

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};
newPassport(jonas);
checkIn(flight, jonas);
log(flight, jonas);

/* --------------------------- Functions accepting callback function ------------------------- */

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFistWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
// Higher order function
const transformer = function (str, fn) {
  log('\n');
  log(`Original String ${str}`);
  log(`Transformed by : ${fn.name}`);
  log(`Transformed String : ${fn(str)}`);
};

transformer('Javascript is the Best', upperFistWord);
transformer('Javascript is the Best', oneWord);

const high5 = function () {
  log('Hello');
};

document.body.addEventListener('click', high5);

['hi', 'hello', 'world'].forEach(high5);

/* -------------------- Function returning function ----------------------- */

const greet = function (greeting) {
  return function (names) {
    console.log(`${greeting} ${names}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');

greet('Hello')('Jonas');

// simple example

const createMultiplier = function (num) {
  return function (value) {
    return value * num;
  };
};

const double = createMultiplier(2);
/*  a function is stored in double varible with num as 2(it remember num as 2) */
log('double : ', double);
log(double(10));
const triple = createMultiplier(3);
/*  a function is stored in double varible with num as 3(it remember num as 3) */
log('triple : ', triple);
log(triple(10));

const greet1 = greeting => {
  return names => {
    console.log(`${greeting} ${names}`);
  };
};

// Alternative way : greet = greeting => names => console.log(`${greeting} ${names}`);
const greeterHey1 = greet1('Hey');
greeterHey1('Jonas');

greet1('Hello')('Jonas');

/* ------------------- The call and apply methods ------------------- */

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    log(
      ` ${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(264, 'Raj Kumar');
lufthansa.book(264, 'John Smith');
log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'Ew',
  bookings: [],
};

const book = lufthansa.book;

/* 
  This show an error because the this keywords object wil undefined (strict mode) so it show error like :
  "Uncaught TypeError: Cannot read properties of undefined (reading 'airline')"

   so resolve this we can follow these 3 methods :call , apply and bind 
*/
//book(23, 'sarah');

/* 
  -------Call
    Function also an object so we can call method
    {functionName}.call (object, arugement1,arugement2, ..etc);
*/
book.call(eurowings, 245, 'sarah');
log(eurowings);
book.call(lufthansa, 235, 'Marry');
log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 235, 'Marry');
log(swiss);

/* 
------------ apply 
  .apply(object, array);
*/

const flightData = [567, 'Geroge'];
book.apply(swiss, flightData);

// In modern js most used method instead of apply
book.call(swiss, ...flightData);
log(swiss);

/* --------------------- The Bind method --------------------- */

/* 
    it Create an new funtion with this(object) fixed
 */

// book.bind(eurowings, 32, 'Ram'); => not recommed ,work only for ram
const bookEw = book.bind(eurowings);
const bookLH = book.bind(swiss);
const bookLX = book.bind(lufthansa);
log(bookEw);
bookEw(32, 'Ram');
bookEw(357, 'Steven');
log(eurowings);

//set specific filgths based on the example
// flight num : 23
const bookEw23 = book.bind(eurowings, 23);
bookEw23('Jonas');
bookEw23('Rajesh');
log(eurowings);

// with  Event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  log(this);
  this.planes++;
  log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);  --> in this event this keywords with points to elements buy so it show error to reslove this

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial appliction -> pre set parametes

const addTax = (rate, value) => value + value * rate;

log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

log(addVAT(100));
log(addVAT(23));

const addNewTax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

log(addNewTax(0.23)(100));

/* ---------------------- Immediately Invoked Function Expressions (IIFE) ----------------------*/

// Function expression

(function () {
  console.log('This will never runs again!');
})();

//arrow Function

(() => {
  console.log('This will never runs again!');
})();

/* ---------------------- Closures ----------------------*/

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    log(`${passengerCount} passengers`);
  };
};

log(secureBooking());
const booker = secureBooking();
booker();
booker();
booker();

/* ----------------- More Closure Example -----------------*/

// Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    log(b * 2);
  };
};

g();
f();
console.dir(f);
h(); // reassign f function on h()
f();
console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    log(`We are now borading all ${n} Passengers`);
    log(`There are 3 groups , each with ${perGroup} passengers`);
  }, wait * 1000);

  log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // closure has priority in scope chain
boardPassengers(180, 3);

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2026-08-23T23:36:17.929Z',
    '2026-08-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementsDates = function (date, locale) {
  const calcDaysPassed = (d1, d2) =>
    Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
  const days = calcDaysPassed(new Date(), date);

  if (days === 0) return 'Today';
  if (days === 0) return 'Yesterday';
  if (days <= 7) return `${days} days ago`;
  /* const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; */

  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // BUG
  /* const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
 */
  // FIX THE BUG
  const combinedMovments = acc.movements.map((mov, i) => ({
    movement: mov,
    movementsDate: acc.movementsDates[i],
  }));
  if (sort) {
    combinedMovments.sort((a, b) => a.movement - b.movement);
  }

  combinedMovments.forEach(function ({ movement: mov, movementsDate }, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementsDate);

    const displayDate = formatMovementsDates(date, acc.locale);
    const formattedMovment = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovment}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(incomes);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(out));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, newtimer;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    // when time is 0 ,stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // decrease time
    time--;
  };

  //set time to 5 minutes
  let time = 5 * 60;

  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    const dateOptions = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // long ,2-digit,numeric
      year: 'numeric', // long ,2-digit
      //weekday: 'long', // long ,narrow,short
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      dateOptions
    ).format(intlDate);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // log out
    if (newtimer) clearInterval(newtimer);
    newtimer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    // reset in actve time
    clearInterval(newtimer);
    newtimer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    setTimeout(() => {
      updateUI(currentAccount);
      // reset in actve time
      clearInterval(newtimer);
      newtimer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* -------------------------- Converting and Checking Numbers ------------------------------- */

// 10 => 0-9
// 2=>0,1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// conversion
console.log(Number('15'));
console.log(+'15');

//parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('30px', 2));
console.log(Number.parseInt('e23', 10));

console.log(Number.parseInt('3.5rem'));
console.log(Number.parseFloat('2.3rem'));

// isNaN -> check is value NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20px'));
console.log(Number.isNaN(23 / 0)); // 23/ 0 Infinity=> false

// isFinite
console.log('is finite');
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20px'));
console.log(Number.isFinite(23 / 0)); // 23/ 0 Infinity=> false

// isInteger
console.log('is integer');
console.log(Number.isInteger(20));
console.log(Number.isInteger('20'));
console.log(Number.isInteger(23.5));
console.log(Number.isInteger(23 / 0));

/* -------------------------- Math and Rounding ------------------------------- */

// square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3));

// Max ,Min

console.log(Math.max(5, 2, 35, 56, 232, 352, 56, 73));
console.log(Math.max(5, 2, 35, 56, '232', 352, 56, 73));
console.log(Math.max(5, 2, 35, 56, '232PX', 352, 56, 73));
console.log(Math.min(5, 2, 35, 56, 232, 352, 56, 73));

// area of circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random
console.log(Math.random());
console.log(Math.random() * 6 + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// Rounding integer
console.log(Math.trunc(23.3));
// round nearest
console.log(Math.round(23.3));
console.log(Math.round(23.9));
//  rounded up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));
//  rounded down
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.9));
console.log(Math.floor(-23.9));

// Round Decimals
console.log((2.7).toFixed(0)); // return vale as string
console.log((2.7).toFixed(2));
console.log((2.7343).toFixed(2));
console.log(+(2.7343).toFixed(2));

/* -------------------------- The Remainder Operator ------------------------------- */

console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 % 3);

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i, arr) => {
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    if (i % 3 === 0) row.style.backgroundColor = 'lightgreen';
  });
});

/* -------------------------- Numeric Separators------------------------------- */

let thousand = 1_000;
let billion = 1_000_000_000;

console.log(thousand, billion);

let price1 = 15_00;
let price2 = 1_500;

console.log(Number('23_000')); // string can't convert  to number
console.log(Number.parseInt('23_000_000'));

/* --------------------------  Working with BigInt------------------------------- */

//  64 total 53 usable bits

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1); // not proper value
console.log(2 ** 53 + 2); // not proper value
console.log(2 ** 53 + 3); // not proper value
console.log(2 ** 53 + 4); // not proper value

console.log(452486258933289632591247983569532766n);
console.log(BigInt(2138345373)); // large muber cause problem

console.log(10000n + 10000n);
console.log(452486258933289632591247983569532766n * 12345667888900n);

// console.log(20497213674214378n * 2); //Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

console.log(20497213674214378n * BigInt(2));

// Exception (comparsion and + operator)

console.log('20n > 15 : ', 20n > 15);
console.log('20n === 20 : ', 20n === 20);
console.log(typeof 15n);
console.log(20n == '20');

console.log(452486258933289632591247983569532766n + 'is Big Int Value');

console.log(10n / 3n); // cut off decimal part
console.log(11n / 3n); // return closest big int numbeee
console.log(10 / 3);

/* --------------------------  Creating Dates ------------------------------- */

// Create date
const now = new Date();
console.log(now);

console.log(new Date('Aug 28 2027 16:15:23'));
console.log(new Date('Dec 25 2030'));

console.log(new Date(2025, 5, 12, 15, 34, 10));

console.log(new Date(0));
console.log(new Date(24 * 60 * 60 * 1000 * 10));

// working with date

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

/* -------------------------- Adding Dates to "Bankist" App ------------------------------- */

// Fake Logged in

/* currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// Display UI and message
labelWelcome.textContent = `Welcome back, ${
  currentAccount.owner.split(' ')[0]
}`; */
const now_ = new Date();
const day = `${now_.getDate()}`.padStart(2, 0);
const month = `${now_.getMonth() + 1}`.padStart(2, 0);
const year = now_.getFullYear();
const hour = `${now_.getHours()}`.padStart(2, 0);
const min = `${now_.getMinutes()}`.padStart(2, 0);

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

/* -------------------------- Fixing a Sorting Bug ------------------------------- */

// in dispaly movements need create new object that has movements  and date and pass that to all because during te srt movement are sort but date are not sorted

/* -------------------------- Operations With Dates  ------------------------------- */

console.log('Future in millisecond : ', +future);

// calculate no of days passed

const calcDaysPassed = (d1, d2) => Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);

const noOfDays = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 15));
console.log(noOfDays);

// update date to no_of_days < 7 days and dates(dd-mm-YYYY) > 7 check function formatMovementsDates

/* -------------------------- Internationalizing Dates (Intl) ------------------------------- */

const intlDate = new Date();
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', // long ,2-digit,numeric
  year: 'numeric', // long ,2-digit
  weekday: 'long', // long ,narrow,short
};

console.log(
  'Internationalizing Dates (Intl) en-IN : ',
  new Intl.DateTimeFormat('en-In').format(intlDate)
);
const locale = navigator.language;
console.log(locale);
console.log(
  'Internationalizing Dates (Intl) en-IN : ',
  new Intl.DateTimeFormat(locale, dateOptions).format(intlDate)
);

/* -------------------------- Internationalizing Number (Intl) ------------------------------- */

const num = 234554643.545;

const numberOptions = {
  style: 'currency', // unit
  unit: 'celsius',
  currency: 'INR',
};

console.log(new Intl.NumberFormat('en-IN', numberOptions).format(num));
console.log(
  new Intl.NumberFormat('en-IN', {
    style: 'unit', // unit
    unit: 'mile-per-hour',
  }).format(num)
);
// for more refer MDN DOCS

// App to avoid don't repeat your self we create function for formating the number by InTL.NumberFomat.

/* -------------------------- Timers: setTimeout and setInterval ------------------------------- */

// setTimeout

const timer = setTimeout(
  (a1, a2) => {
    console.log(`Here is your Pizza wtih ${a1} and ${a2}`);
  },
  3050,
  'olives',
  'spinach'
);

const array = ['olives', 'spinach'];
setTimeout(
  (a1, a2) => {
    console.log('Here is your Pizza ', a1, a2);
  },
  3000,
  ...array
);

console.log('Waiting...');
if (array.includes('olives')) clearTimeout(timer);

// setInterval

const t2 = setInterval(() => {
  console.log(new Date());
}, 1000);

setTimeout(() => clearInterval(t2), 3500);
/* --------------------------  Implementing a Countdown Timer------------------------------- */

// creating a logout function start logout timers for Bankist user

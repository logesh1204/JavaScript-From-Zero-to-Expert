'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* -------------------------- simple array Methods -------------------------------------------- */

let arr = ['a', 'b', 'c', 'd', 'e'];

//slice(start,end)
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
// shallow copy of arr
console.log(arr.slice());
console.log([...arr]);

//splice(start,deletCount) : remove the element form original array
// start : startng position in the array  ,deleteCount and no of element need to remove  form start
let arr1 = ['a', 'b', 'c', 'd', 'e'];
// arr1.splice(2);
arr1.splice(-1);
console.log(arr1);
arr1.splice(1, 2);
console.log(arr1);

// reverse : it reverse the original array
let arrRes = ['a', 'b', 'c', 'd', 'e'];
arrRes.reverse();
console.log(arrRes);

//concat
let arrRes1 = ['a', 'b', 'c', 'd', 'e'];
let newarray = arrRes.concat(arrRes1);
console.log(newarray);
//optinal
console.log([...arrRes, ...arrRes1]);

//join
console.log('By default of join method : ', newarray.join());
console.log(newarray.join(' - '));

/* -------------------------- The New at Method -------------------------------------------- */

console.log('without at() : ', newarray[3]);
console.log('with at() : ', newarray.at(3));

// To get the last element
// old
console.log(newarray[newarray.length - 1]);
console.log(newarray.slice(-1)[0]);
// new
console.log(newarray.at(-1)); // Negative inde is allowed

// support in string also
console.log('jonas'.at(-1));

/* -------------------------- Looping Arrays: forEach  -------------------------------------------- */

// for of loop

for (const [j, movement] of movements.entries()) {
  console.log(
    `Movement ${j + 1} : You ${
      movement > 0 ? 'desposited' : 'withdrew'
    } ${Math.abs(movement)}`
  );
}
console.log('----- ForEach -----');
// forEach
//  syntax : array.forEach (function(elemnet,index,array){})
movements.forEach(function (movement, i, arr) {
  console.log(
    `Movement ${i + 1} : You ${
      movement > 0 ? 'desposited' : 'withdrew'
    } ${Math.abs(movement)}`
  );
});

/* -------------------------- forEach With Maps and Sets  -------------------------------------------- */
console.log(currencies);
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'INR']);
console.log(currenciesUnique);
// key and value are same because set has no indexes in it
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key} : ${value}`);
});

/* -------------------------- Creating DOM Elements  -------------------------------------------- */

//App

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const curMovs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  curMovs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <!--<div class="movements__date">3 days ago</div> -->
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/* -------------------------- The Map method  -------------------------------------------- */
const eurotoUsd = 1.1;

//old way
const movementsUSD = [];
for (const move of movements) movementsUSD.push(move * eurotoUsd);
console.log('without Map : ', movementsUSD);
// modern way
/* const movementsInUSD = movements.map(function (mov) {
  return mov * eurotoUsd;
}); */
// arrow function
const movementsInUSD = movements.map(mov => mov * eurotoUsd);
console.log('with Map : ', movementsInUSD);

const movementDesc = movements.map(
  (movement, i) =>
    `Movement ${i + 1} : You ${
      movement > 0 ? 'desposited' : 'withdrew'
    } ${Math.abs(movement)}`
);

console.log(movementDesc);

/* -------------------------- Computing Usernames   -------------------------------------------- */

// App
const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

/* -------------------------- The filter Method  -------------------------------------------- */

// Old Way
const despositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    despositsFor.push(mov);
  }
}
console.log('Old way :', despositsFor);

const desposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log('modern way by filter(desposits) : ', desposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log('modern way by filter(withdrawals) : ', withdrawals);

/* --------------------------  The reduce Method   -------------------------------------------- */
// Example of reduce
//old way
let balance = 0;
for (const mov of movements) balance += mov;
console.log('old way : ', balance);

// modern way

let newBalance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`${i + 1} : ${acc}`);
  return acc + cur;
}, 0);

// arrow function
console.log(
  'By arrow function : ',
  movements.reduce((acc, cur) => acc + cur, 0)
);
console.log('By function experssion : ', newBalance);

// Maximum value
const max = movements.reduce((acc, mov) => {
  return mov > acc ? mov : acc;
}, movements[0]);
console.log(max);

//App -> labelBalance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

/* --------------------------  The reduce MethodThe Magic of Chaining Methods    -------------------------------------------- */

// likea pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurotoUsd)
  /* 
    // to debbug , 
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurotoUsd;
  }) */
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// App

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    // interest need add only 1 or more than 1
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

/* --------------------------  The reduce MethodThe Magic of Chaining Methods    -------------------------------------------- */

const firstWithdrawal = movements.find(mov => mov < 0);

console.log('Movements : ', movements, ',First Withdrawal : ', firstWithdrawal);

// old way
let account = undefined;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') account = { ...acc };
}

// modern Way
const accountNew = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log('Old Way : ', account, '\nModern way : ', accountNew);

/* -------------------------- Implementing Login ------------------------------- */

//App
let curruentAccount;
const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  curruentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (curruentAccount?.pin === Number(inputLoginPin.value)) {
    // clear the inputs
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    // Based on flowchart
    // display UI elements
    labelWelcome.textContent = `Welcome back, ${
      curruentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    updateUI(curruentAccount);
  }
});

/* -------------------------- Implementing Transfers ------------------------------- */

// App
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    curruentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== curruentAccount.createUsername
  ) {
    curruentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  updateUI(curruentAccount);
});

/* -------------------------- The findIndex Method  ------------------------------- */

// App
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(...accounts);
  if (
    curruentAccount.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === curruentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === curruentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  console.log(accounts);
});

/* -------------------------- The New findLast and findLastIndex Methods ------------------------------- */

console.log(movements);

const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// Your lastest large movement was x movements ago

const lastestMovements = movements.findLastIndex(mov => Math.abs(mov) > 1000);

console.log(lastestMovements);
console.log(
  `Your lastest large movement was ${
    movements.length - lastestMovements
  } movements ago`
);

/* -------------------------- some and every  ------------------------------- */

// SOME()

// for equality
console.log('array.includes () : ', movements.includes(450));

// for conditon
console.log(
  'array.some() [movements Deposit > 1000]: ',
  movements.some(mov => mov > 1000)
);

// App -> Request Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputLoanAmount.value);

  if (amount > 0 && curruentAccount.movements.some(mov => mov > amount * 0.1)) {
    // 10%
    curruentAccount.movements.push(amount);
    updateUI(curruentAccount);
  }
  inputLoanAmount.value = '';
});

// EVERY

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// separate callbacks
console.log('separate callbacks');
const desposit = mov => mov > 0;
console.log(movements.some(desposit));
console.log(movements.every(desposit));
console.log(movements.filter(desposit));

/* -------------------------- flat and flatMap  ------------------------------- */

const ab = [1, [2, 3], 4, 5, [6, 7, 8], 9, 10, 11, [12, 13]];
const bc = [1, [[2, 3], 4], 5, [[6, 7], 8], 9, 10, [11, [12, 13]]];
console.log(' Flat () => : ', ab.flat(), '\n array : ', ab);
console.log(' array : ', bc, '\n Flat () => :', bc.flat()); // depth =1 by default
console.log(' array : ', bc, '\n Flat (2) => :', bc.flat(2)); // depth =2

//Flat()
const allMovements = accounts.map(acc => acc.movements).flat();
const overAllBalance = allMovements.reduce((acc, cur) => acc + cur);
console.log(
  'all Movements : ',
  allMovements,
  '\nover All Balance : ',
  overAllBalance
);

// flatmap
const overAllBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur);

console.log(
  'over All Balance : ',
  overAllBalance2,
  '\n flatmap () : ',
  accounts.flatMap(acc => acc.movements)
);

/* -------------------------- Sorting Arrays ------------------------------- */

//strings
const owners = [
  'Jonas Schmedtmann',
  'Jessica Davis',
  'Steven Thomas Williams',
  'Sarah Smith',
];
// sort -> modify te original array
owners.sort();
console.log(owners);
//Number
let transfer = movements.slice();
transfer.sort();
console.log(transfer); // not order properly because it sort based on string

// Ascending order
transfer.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
//  sort((a,b) =>a-b) => asc in math
console.log(transfer);
// Descending order
transfer.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
//  sort((a,b) =>b-a) => desc in math
console.log(transfer);

// App -> sorting the movements
// 1.add new parameter(sort) in the display monements function as stated variable (true or false)

// 2
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(curruentAccount.movements, sorted);
});

/* -------------------------- Array Grouping ------------------------------- */

const groupMovements = Object.groupBy(movements, movement => {
  return movement > 0 ? 'deposits' : 'withdrawals';
});
console.log(groupMovements);

const groupByActivity = Object.groupBy(accounts, acc => {
  const movesCount = acc.movements.length;
  if (movesCount >= 8) return 'very active';
  if (movesCount >= 4) return 'active';
  if (movesCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(groupByActivity);

// In object (easier than array)
// const groupByType = Object.groupBy(accounts, acc => acc.type);
const groupByType = Object.groupBy(accounts, ({ type }) => type); // another way by  destructing

console.log(groupByType);

/* -------------------------- More Ways of Creating and Filling Arrays  ------------------------------- */

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Empty array + fill() method
let x = new Array(7);

// x.fill(1);
console.log(x);
x.fill(2, 2);
console.log(x);
x.fill(3, 3, 5);
console.log(x);

// Array.from()

const y = Array.from({ length: 7 }, () => 1);
console.log(y);
const zw = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(zw);

labelBalance.addEventListener('click', () => {
  const move1 = Array.from(document.querySelectorAll('.movements__value'), el =>
    Number(el.textContent.replace('€', ''))
  );
  const move2 = [...document.querySelectorAll('.movements__value')]; // another way
  console.log(move1);
});

/* -------------------------- Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with ------------------------------- */

let moves1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(' ORIGINAL : ', moves1);

const reverseAlter = moves1.toReversed();
console.log('REV : ', reverseAlter);

const sortAlter = moves1.toSorted((a, b) => a - b);
console.log('SORT : ', sortAlter);

const newWith = moves1.with(2, 399);
console.log("'WITH : '", newWith);
console.log(' ORIGINAL : ', moves1);

/* -------------------------- Array Methods Practice ------------------------------- */
// 1
const BankDeposits = accounts
  .flatMap(({ movements }) => movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur);
console.log(BankDeposits);
// 2
const BankDeposits1000 = accounts
  .flatMap(({ movements }) => movements)
  // .filter(mov => mov > 1000).length; // anothe way
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(BankDeposits1000);

// 3
const { deposit: bDeposit, Withdrawal: bWithdrawal } = accounts
  .flatMap(({ movements }) => movements)
  .reduce(
    (acc, cur) => {
      cur > 0 ? (acc.deposit += cur) : (acc.Withdrawal += cur);
      return acc;
    },
    { deposit: 0, Withdrawal: 0 }
  );
console.log(bDeposit, bWithdrawal);
// 4
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'and', , 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');
  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

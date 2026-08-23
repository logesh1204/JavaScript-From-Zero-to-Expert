'use strict';
const log = value => console.log(value);

/*  ----------  Scoping practice ------------------------*/
function clacAge(birthYear) {
  const age = 2037 - birthYear;
  log(firstName);
  /* 
    - first name is not found on the calcAge scope.
    - the  scope chain loopkup form it scope to parent (global)scope ,it has the scope for the variable so it can be accesseed
    */
  function printAge() {
    let output = `${firstName} in ${age}, born in ${birthYear}`;
    log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'steven';
      const str = `Oh, and You're a millenial,${firstName}`;
      log(str);

      function add(a, b) {
        return a + b;
        /* 
         - add function is blockscope if it's in use strict mode
      */
      }
      /*
        assinging => output = 'NEW OUTPUT';
        creating new variable => const output = 'NEW OUTPUT';

        - when we reassign or assign variable of parent scope it will update content of the variable 
        - when we create new variable with samae name of parent scope it treated as new variable and it does change anything in the variable of parent scope

      */
    }
    //log(str); //Uncaught ReferenceError: str is not defined
    log(millenial); // var is function scope
    // log(add(5, 6));
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
clacAge(1991);
/*log(age);
printAge();

 - we can access the above variable and function because they are in block scope
*/

/* ------------  Hoisting practice -------------------*/

// Variable
console.log(age); //undefined
//console.log(job); //Cannot access 'Name' before initialization
// console.log(Name); //Cannot access 'Name' before initialization

const Name = 'Jonas';
let job = 'Teacher';
var age = 30;

// function
log(add(4, 6));
// log(sub(4,6)); // Cannot access 'sub' before initialization
//log(mult(4,6)); //mult is not a function

function add(a, b) {
  return a + b;
}

const sub = function (a, b) {
  return a - b;
};

var mult = (a, b) => a * b;

// example for creating a bug

if (!product) deleteProduct(); // becuase the product is undefined due the hoisting

var product = 10;

function deleteProduct() {
  log('All product deleted');
}

/* ------------  THIS Keyword practice -------------------*/

log(this); // window object

const showAge = function (year) {
  log(2045 - year);
  log(this); // undefined
};

showAge(1996);

const showAgeArrow = year => {
  log(2045 - year);
  log(this); // window object
};
showAgeArrow(1996);

const Jonas = {
  age: 45,
  getAge: function () {
    log(this);
    log(this.age);
  },
};
Jonas.getAge();

const matilda = {
  year: 43,
};

matilda.getAge = Jonas.getAge; // method borrowing

matilda.getAge();

const f = Jonas.getAge;
// f(); //Cannot read properties of undefined (reading 'age') because it function experssion so, this has undefined value

/*---------- Regular Function vs Arrow Function ------------- */

const jonas = {
  firstName: 'Jonas',
  age: 45,
  getAge: function () {
    //log(this);
    log(this.age);

    /* 
    Problem : this is undefined 

    const isAdult = function () {
      if (this.age > 18) {
        log('He is an Adult');
      } else {
        log('He is not a Adult');
      }
    };*/
    // solution 1: create new variable and assigning this object
    /*
    const self = this;
     const isAdult = function () {
      if (self.age > 18) {
        log('He is an Adult');
      } else {
        log('He is not a Adult');
      }
    }; */
    // solution 2: use arrow function (it point to parent scope based on scope chain)
    const isAdult = () => {
      if (this.age > 18) {
        log('He is an Adult');
      } else {
        log('He is not a Adult');
      }
    };
    isAdult();
  },
  greet: () => {
    log(`Hey ${this.firstName}`);
  },
};

/* 
  - greet is undefined because arrow function point surrounding object (it cannot creeate their own this objecst). in above arraow function it pointing the window object.
  - window object does not have firstName, so it is undefined
*/
jonas.greet();
jonas.getAge();

// Arugemnts keywords
// it is only available to the Regular Function
const addNew = function (a, b) {
  log(arguments);
  log(a + b);
};

const addNewArrow = (a, b) => {
  log(arguments);
  log(a + b);
};

addNew(123, 159, 2, 5, 9, 4, 6, 9);
//addNewArrow(123, 159, 2, 5, 9, 4, 6, 9); //Uncaught ReferenceError: arguments is not defined

/* ----------------Objects Reference  in practice (shallow vs deep Copies)------------------ */

const jessica = { firstNmae: 'Jessica', lastName: 'Willams', age: 27 };

// const marriedJessica = jessica;
// marriedJessica.lastName = 'Davis';
function marryperson(person, lastName) {
  person.lastName = lastName;
  return person;
}
// On the both solution only object reference is passed or assigned  not object itself
const marriedJessica = marryperson(jessica, 'Davis');
console.log('Before:', jessica);
console.log('After:', marriedJessica);

const jessica2 = {
  firstNmae: 'Jessica',
  lastName: 'Willams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = { ...jessica2 };
jessicaCopy.lastName = 'Davis';

log(jessica2);
log(jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before:', jessica2);
console.log('After:', jessicaCopy); // shallow clone, in object coping nested object pass only reference not the object

const jessicaClone = structuredClone(jessica2);

jessicaClone.family.push('Lucy');
jessicaClone.family.push('Jack');

console.log('Original:', jessica2);
console.log('Clone:', jessicaClone); // Deep clone

'use strict';
/* -------------------------- Constructor Functions and the new Operator ------------------------------- */

const Person = function (firtName, birthyear) {
  // Instance Properties
  this.firtName = firtName;
  this.birthyear = birthyear;

  // Never do this
  //   this.calcAge = function(){
  //     console.log(2037 - this.birthyear);
  //   };
  // soution is prototype function
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
/* 
    New operator behind the scenes

    1. New empty object {} is create
    2. Function is called , set this = {} New empty object
    3. Empty object {} linked with prototype
    4. function automatically return the object {}
*/

const marry = new Person('Marry', 2000);
console.log(marry);
let jonass;
console.log(jonas instanceof Person);
console.log(jonass instanceof Person);

/* -------------------------- Prototypes ------------------------------- */
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthyear);
};

jonas.calcAge();
marry.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(marry));

// person.prototype is for it's object not for it's own

// add property
Person.prototype.species = 'homo Sapiens';
console.log(jonas.species, marry.species);

console.log(jonas.hasOwnProperty('firtName'));
console.log(jonas.hasOwnProperty('species'));

/* --------------------------  Prototypal Inheritance on Built-In Objects------------------------------- */

console.log(jonas.__proto__);
// object .prototype(top of prototype)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 3, 9, 8];

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

console.dir(document.querySelector('h1'));
console.dir(x => x + 1);

/* -------------------------- ES6 Classes ------------------------------- */

// class expression
// const PresonCl = class{};

// Class dclaration

class PresonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Method will be added to  .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log('Hey', this.fullName);
  }

  // set property already exists
  set fullName(name) {
    // validation
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full Name `);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PresonCl('jessica', 1996);
const jessicaDavis = new PresonCl('jessica Davis', 1996);

console.log(jessica);
console.log(jessicaDavis);
jessica.calcAge();

console.log(jessica.__proto__ === PresonCl.prototype);

// PresonCl.prototype.greet = function () {
//   console.log('Hey', this.fullName);
// };
jessicaDavis.greet();

// 1. Classes are not Hoisted
// 2. class are first -class citizes (can passed and return from funtion )
// 3. Classes are executed in strict mode(also the entire script not in strict mode)

/* -------------------------- Setters and Getters ------------------------------- */

// Object Literal
const account = {
  name: 'Jonas',
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 501;
console.log(account);

// check class personCl for set,get
console.log(jessicaDavis.fullName);

/* -------------------------- Static Methods ------------------------------- */

function AddPerson(name) {
  this.fullName = name;
}
AddPerson.prototype.getfullName = function () {
  console.log(`Hey ${this.fullName}`);
};
const Raj = new AddPerson('Raj Kumar');
// Static method for construction function
AddPerson.greet = function () {
  console.log('Hey there! You can create n number of person here');
};
console.log(Raj);
Raj.getfullName();
AddPerson.greet();
// Raj.greet(); //script.js:171 Uncaught TypeError: Raj.greet is not a function

class AddPerson1 {
  constructor(name) {
    this.fullName = name;
  }
  // instance method
  getfullName = function () {
    console.log(`Hey ${this.fullName}`);
  };
  // static method
  static greet() {
    console.log('Hey there! You can create n number of person here');
  }
}

const ram = new AddPerson1('Ram raj');
ram.getfullName();
AddPerson1.greet();
// ram.greet(); //script.js:190 Uncaught TypeError: Raj.greet is not a function

/* -------------------------- Object.create ------------------------------- */

const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(name, birthYear) {
    this.firstName = name;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(personProto);
console.log(steven);
steven.firstName = 'Steven';
steven.birthYear = 1999;
steven.calcAge();
console.log(steven);
const sarah = Object.create(personProto);
sarah.init('Sarah', 2002);
sarah.calcAge();

/* -------------------------- Inheritance Between "Classes": Constructor Functions ------------------------------- */

const PersonIn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonIn.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  PersonIn.call(this, firstName, birthYear);
  this.course = course;
};

// lonking the prototype
Student.prototype = Object.create(PersonIn.prototype);
Student.prototype.introduce = function () {
  console.log(
    `My name is ${this.firstName} and I study ${(this, this.course)}`
  );
};

const mike = new Student('Mike', 2020, 'CSE');

console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonIn);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);
console.log(mike);

/* -------------------------- Inheritance Between "Classes": ES6 Classes ------------------------------- */

class PresonClIn {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full Name `);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there!`);
  }
}

class StudentClIn extends PresonClIn {
  constructor(fullName, birthYear, course) {
    // Always needa to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      `My name is ${this.fullName} and I study ${(this, this.course)}`
    );
  }

  calcAge() {
    console.log(`I am ${2037 - this.birthYear} years old `);
  }
}

const martha = new StudentClIn('Martha Jones', 2012, 'EEE');
martha.introduce();
martha.calcAge();
console.log(martha);

/* --------------------------  Inheritance Between "Classes": Object. create------------------------------- */

const PersonOcIn = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven1 = Object.create(PersonOcIn);

const StudentOCIn = Object.create(PersonOcIn);
StudentOCIn.init = function (firstName, birthYear, course) {
  PersonOcIn.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentOCIn.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentOCIn);
jay.init('Jay', 2012, 'ECE');
jay.introduce();
jay.calcAge();

/* --------------------------  Another Class Example------------------------------- */
class Account {
  constructor(owner, curreny, pin) {
    this.owner = owner;
    this.curreny = curreny;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thank for creating an account,${this.owner}`);
  }

  deposit(amt) {
    this.movements.push(amt);
  }
  withdrawal(amt) {
    this.deposit(-amt);
  }
  apporvedLoan() {
    return true;
  }
  requestLoan(amt) {
    if (this.apporvedLoan()) {
      this.deposit(amt);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1221);
// acc1.movements.push(200);
// acc1.movements.push(-198);

acc1.deposit(200);
acc1.withdrawal(102);
acc1.requestLoan(230);
acc1.apporvedLoan();
console.log(acc1);
/* --------------------------  Encapsulation: Private Class Fields and Methods ------------------------------- */

// Private fields (property) and method
// Public feilda and method
class Account1 {
  //public fields
  locale = navigator.language;
  bank = 'Banist';
  // private fields
  #movements = [];
  #pin;
  constructor(owner, curreny, pin) {
    this.owner = owner;
    this.curreny = curreny;
    this.#pin = pin;

    console.log(`Thank for creating an account,${this.owner}`);
  }

  deposit(amt) {
    this.#movements.push(amt);
  }
  withdrawal(amt) {
    this.deposit(-amt);
  }
  // private method
  #apporvedLoan() {
    return true;
  }

  getMovements() {
    return this.#movements;
  }

  requestLoan(amt) {
    if (this.#apporvedLoan()) {
      this.deposit(amt);
    }
  }
}

const acc2 = new Account1('Jonas', 'EUR', 1221);

acc2.deposit(200);
// console.log(acc1.#movements);
console.log(acc2.getMovements());
console.log(acc2);

/* -------------------------- Chaining Methods ------------------------------- */

class Account2 {
  constructor(owner, curreny, pin) {
    this.owner = owner;
    this.curreny = curreny;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thank for creating an account,${this.owner}`);
  }

  deposit(amt) {
    this.movements.push(amt);
    return this;
  }
  withdrawal(amt) {
    this.deposit(-amt);
    return this;
  }
  apporvedLoan() {
    return true;
  }
  requestLoan(amt) {
    if (this.apporvedLoan()) {
      this.deposit(amt);
    }
    return this;
  }
}

const acc3 = new Account2('Jonas', 'EUR', 1221);

acc3.deposit(230).withdrawal(200).requestLoan(20000).withdrawal(1000);
console.log(acc3);

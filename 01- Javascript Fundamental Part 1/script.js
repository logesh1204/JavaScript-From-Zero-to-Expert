function log(value){
    console.log(value);
}

let js = 'amazing';
//if(js === 'amazing') alert('Javascript is Fun!');
console.log(40+8+23-10);

/*
value & variable
-----------------
Variables are identified with names called identifiers.
Names can be short like x, y, z.
Names can be descriptive like age, sum, carName.

The rules for constructing names (identifiers) are:
Names can contain letters, digits, underscores, and dollar signs.
Names must begin with a letter, a $ sign or an underscore (_).
Names are case sensitive (X is different from x).
Reserved words (JavaScript keywords) cannot be used as names.

*/
let myName = 'logesh'; 
console.log(myName);
// let => declaration statements,firstName => Variable name,logesh=>value


/*
Data Type 
----------
*/

let firstNamePerson = 'logesh';  //string
let days = '12';  //Number
let isValid = true ; // boolean

// typeof operator is used to show type of the value
console.log(typeof firstNamePerson);
console.log(typeof isValid);
console.log(typeof days);

// dynamic typing 
let JavascriptIsFun = true;
console.log( 'JavascriptIsFun - '+typeof JavascriptIsFun);
JavascriptIsFun='Yes!';
console.log('JavascriptIsFun - '+typeof JavascriptIsFun);

// undefined & null

let myYear;
console.log(typeof myYear);
console.log( 'Null - '+typeof null); //object


/* 
operators
---------
*/
//Arithmetic Operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--;
x--;

console.log(x);
// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

/* 
String & template literal 
--------------------------
*/




const job = 'teacher';
const birthYear = 1991;
const year = 2037;

// String concatenation
const jonas =
  "I'm " +
  firstName +
  ", a " +
  (year - birthYear) +
  " year old " +
  job +
  "!";

console.log(jonas);

// Template literal
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;

console.log(jonasNew);


/*
 if-else  statement
 -------------------
*/
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const myBirthYear = 2012;

let century;
if (myBirthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
/* 
Type conversion and coercion
------------------------------
*/
console.log('-- Type conversion and coercion --');
const input = '18';
console.log(input+20); 
//convert input form string to number by bulit-in function
console.log(Number(input)+20);

// type coercion
log("I'm "+25+' year old');
 let n= '2'+1;
n= n-1;
log(n);

/*
 truhty and falsy values
 -----------------------

 5 false values : 0,'',undefined,null,NaN
*/
log(Boolean(0));
log(Boolean(undefined));
log(Boolean('hi'));
log(Boolean({}));

let balance = 0;
if(balance){
    log('Balance is :'+balance);
}else{
    log('Empty Balance');
}
balance = 20;
if(balance){
    log('Balance is :'+balance);
}else{
    log('Empty Balance');
}

/* 
Equality operator == vs ===
----------------------------
*/
if('18'=== 18){
     log('you just become adult (strict)');
} else{
    log('your no an adult( strict)');
}
if( 18 === 18){
     log('you just become adult (strict)');
}
if('18'== 18){
    log('you just become adult (loose)');
} else{
   log('your no an adult(loose)');
}

//const inputValue = prompt('Enter 100');
const inputValue ='100';

if(inputValue === 100){
     log('100 is cool number(strict)');
}else{
    log('Number is '+ inputValue);
}

if(inputValue == 100){
    log('100 is cool number (loose)');
}else{
   log('Number is '+ inputValue);
}

/* 
logical operator 
--------------

AND ,OR,NOT operators
*/
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

 if (hasDriversLicense && hasGoodVision) {
   console.log('Sarah is able to drive!');
 } else {
   console.log('Someone else should drive...');
}

const isTired = false; // C

console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Someone else should drive...');
}
/* 
swtich statement
-----------------
*/
const pet = "dog";

switch (pet) {
  case "cat":
    console.log("Meow!");
    break;
  case "dog":
    console.log("Woof!"); // This case runs
    break;
  default:
    console.log("Unknown animal sound.");
}
/* 
ternary operators
-----------------
*/
let mark = 45
 mark > 35 ? log('pass') : log('fail');
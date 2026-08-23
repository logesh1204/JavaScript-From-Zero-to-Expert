'use strict';

function log(value){
    console.log(value);
}
/* 
Activating strict mode
----------------------

Strict mode in JavaScript is a special mode that helps you write safer and cleaner code by catching common mistakes and preventing certain unsafe actions.

You enable it by adding the string "use strict"; at the beginning of a script or function.
Why use strict mode?

It helps by:

Catching common coding mistakes.
Preventing accidental creation of global variables.
Making code easier to optimize by JavaScript engines.
Disallowing certain error-prone language features.
*/

/* let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriverLicense = true; // ReferenceError: hasDriverLicense is not defined
if(hasDriversLicense) log('I can drive '); */


function logger(){
    console.log('My name is jonas');
}

// calling / running / invoking function
logger();

function add(a,b){
    let sum = a+b;
    return sum;
}

let total = add(5,4);

log(total);
log(add(10,26));

/*  
function declaration & experssion 
---------------------------------
*/
// Function declaration
function sub(a,b){
    return a-b;
}

const subValue = sub(120,25);
log(subValue);

// Function experssion

const subValue2 = function (a,b){
    return a-b;
}
log(subValue2(150,45));

/* 
Arrow function 
--------------
*/
const age1 = birthYear => 2026-birthYear;
log(age1(2003));

const addSub = (a,b)=>{
    log(`${a} + ${b} = ${a+b}`);
    log(`${a} - ${b} = ${a-b}`);
}

addSub(123,45);

/* 
Function calling other function 
-------------------------------
*/
const cutPieces = function (fruit) {
    return fruit * 4;
  };
  
  const fruitProcessor = function (apples, oranges) {
    const applePieces = cutPieces(apples);
    const orangePieces = cutPieces(oranges);
  
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
  };
  
  console.log(fruitProcessor(2, 3));
  /* 
  introduction to Array
  ---------------------
  Arrays index start with Zero
  Array can have different data type value in single array
  */

  //creating array

  let Num = [12,23,56,65,897,478];
  log(Num);

let year = new Array(1991,1995,2021,2000,2003);
log(year);

// acessing and updating the value of array
log(Num[2]); 
log(year[3]); 

log(year.length); // dispaly the length of an array
Num[3]=4556;
log(Num);

const friends =['Ram','Jai','Raj'];
const MyName = 'Ravi';

const myDetails = [MyName,2026-2002,'Cook',friends];
log(myDetails);
log(myDetails.length);

const ages =[age1(year[0]),age1(year[0]),age1(year[year.length-1])];
log(ages);

/* 
Basic array operator (Methods) 
------------------------------

.push() -> add element at the end
.unshift() -> add element at the start
.pop() -> remove element at the end
.shift() -> remove element at the start
.indexOf() -> return the position of element
.includes() -> check whether element in an array or not
*/ 

const arr1 = [];
//add
arr1.push(23);
let arr1Newlength = arr1.push(45);
log(arr1);
log(arr1Newlength);

arr1.unshift(122); //return the lenght of array
log(arr1Newlength);

// remove
arr1.pop(); // return the removed element 
log(arr1);
arr1.shift(); // return the removed element 
log(arr1);

let year1 = new Array(1991,1995,2021,2000,2003);

log(year1.indexOf(1991)); //if exist reurn the position ,if not return -1;
log(year1.indexOf(2026));
log(year1.includes(2021)); // return true if exists, if not return false
log(year1.includes(2026)); 

/* 
 Introduction to object
 -----------------------
*/
const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven']
  ];
  
  const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
  };

  /* 
  Dot vs Bracket Notation 
  -----------------------
  */
  let key ='Name';
  log(jonas);
  log(jonas.firstName);
  log(jonas['first'+key]);

  // add new property
jonas.location = 'Protugal';
jonas['tiwtter'] = '@jonasschmedtman';
log(jonas);
// challenge
// jonas has 3 friends and his best friend id caled Michel
log(`${jonas.firstName} has ${jonas.friends.length} friends and his best friend is ${jonas.friends[0]}`);
/* 
  Object methods
  -----------------------
  */
  const jonas1 = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: false,
  
    calcAge: function (birthYear) {
      return 2037 - birthYear;
    },
    calcAge2: function () {
        log(this);
      return 2037 - this.birthYear;
    },
    calcAge3: function () {
      this.age = 2037 - this.birthYear;
      return this.age;
    },
    getSummary : function(){
        return `${this.firstName} is a ${this.calcAge3()}-year old ${this.job}, and has ${this.hasDriversLicense ? 'a' : 'no'} driver's License`;
    }

  };
 
  log(jonas1.calcAge(1991)); 
  log(jonas1.calcAge2()); 
  log(jonas1.calcAge3()); 
// challenge

log(jonas1.getSummary());

/* 
iteration : the for loop
------------------------
*/

for ( let rep =1 ;rep <=10;rep++){
    log(`Lifting weigths reptition ${rep} 😊👍`);
} 
/* 
looping array ,breaking and Continuing
------------------------
*/

const jonasArray2 = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven']
  ];

for(let i=0 ; i<jonasArray2.length;i++){
    log(jonasArray2[i]);
}  
log(' ----- Only string -----')
for(let i=0 ; i<jonasArray2.length;i++){
   if(typeof jonasArray2[i] !=='string') continue;
    log(jonasArray2[i]);
}  
  
log(' ----- Break with Number -----')
for(let i=0 ; i<jonasArray2.length;i++){
    log(jonasArray2[i]);
    if(typeof jonasArray2[i] === 'number') break;
}  

/* 
looping backward ,loop in loop
------------------------
*/
// backward
for(let i=jonasArray2.length-1 ; i>=0;i--){
    log(jonasArray2[i]);
}  

// loop in loop
for (let i=0 ; i<6;i++){
    let z='';
    for(let j=0;j<=i;j++){
        z+=' *';
    }
    log(z);
    
}


/* 
 the while loop
 ----------------
*/

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}
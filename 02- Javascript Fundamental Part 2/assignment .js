"use strict";
function log(value) {
  console.log(value);
}
let country = "Portugal";
let continent = "Europe";
let population = 10;
const isIsland = false;
let language = "English";
/* 
Functions
----------
Write a function called describeCountry which takes three parameters: country, population and capitalCity. Based on this input, the function returns a string with this format: 'Finland has 6 million people and its capital city is Helsinki'.

Call this function 3 times, with input data for 3 different countries. Store the returned values in 3 different variables, and log them to the console.
*/

log("========= Fuctions ========");
const describeCountry = (country, population, capital) => {
  return `${country} has ${population} million people and its capital city is ${capital}`;
};
const portugal = describeCountry("Portugal", 10, "Lisbon");
const germany = describeCountry("Germany", 83, "Berlin");
log(germany);
log(portugal);
/* 
Answer : 

function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPortugal = describeCountry('Portugal', 10, 'Lisbon');
const descGermany = describeCountry('Germany', 83, 'Berlin');
const descFinland = describeCountry('Finland', 6, 'Helsinki');

console.log(descPortugal, descGermany, descFinland);

--------------------------------------------------

Function Declarations vs. Expressions
---------------------------------------
The world population is 7900 million people. Create a function declaration called percentageOfWorld1 which receives a population value, and returns the percentage of the world population that the given population represents. For example, China has 1441 million people, so it's about 18.2% of the world population.

To calculate the percentage, divide the given population value by 7900 and then multiply by 100.

Call percentageOfWorld1 for 3 populations of countries of your choice, store the results into variables, and log them to the console.

Create a function expression which does the exact same thing, called percentageOfWolrd2, and also call it with 3 country populations (can be the same populations).
*/
log("========= Function Declarations vs. Expressions ========");
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

let c1 = 1423;
let c2 = 1502;
let cp1 = percentageOfWorld1(c1);
let cp2 = percentageOfWorld2(c2);

log(cp1, c1);
log(cp2, c2);

/*
Answer :

function percentageOfWorld1(population) {
   return (population / 7900) * 100;
}

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const percPortugal1 = percentageOfWorld1(10);
const percChina1 = percentageOfWorld1(1441);
const percUSA1 = percentageOfWorld1(332);

console.log(percPortugal1, percChina1, percUSA1);
---------------------------------------------------------------

Arrow Functions
-----------------
Recreate the last assignment, but this time create an arrow function called percentageOfWorld3.


*/
log("========= Arrow Fuctions ========");
const percentageOfWorld3 = (population) => (population / 7900) * 100;

log(percentageOfWorld3(1245));
/* 
Answer : 

const percentageOfWorld3 = population => (population / 7900) * 100;
const percPortugal3 = percentageOfWorld3(10);
const percChina3 = percentageOfWorld3(1441);
const percUSA3 = percentageOfWorld3(332);

console.log(percPortugal3, percChina3, percUSA3);
----------------------------------------------------------

Functions Calling Other Functions
----------------------------------

Create a function called describePopulation. Use the function type you like the most. This function takes in two arguments: country and population, and returns a strings like this: 'China has 1441 million people, which is about 18.2% of the world'.

To calculate the percentage, describePopulation calls the percentageOfWorld1 you created earlier.

Call describePopulation with data for 3 countries of your choice.

*/
log("========= Functions Calling Other Functions ========");
const describeCountry1 = (country, population) =>
  log(
    `${country} has ${population} million people, so it's about ${percentageOfWorld3(
      population
    )}% of the world population.`
  );
describeCountry1("c1", 1234);

/* 
Answer :
const describePopulation = function(country, population) {
  const percentage = percentageOfWorld1(population);
  const description = `${country} has ${population} million people, which is about ${percentage}% of the world.`;
  console.log(description);
};

describePopulation('Portugal', 10);
describePopulation('China', 1441);
describePopulation('USA', 332);
-----------------------------------------------------------------
Introduction to Arrays
-----------------------------
Create an array containing 4 population values of 4 countries of your choice. You may use the values you have been using previously. Store this array into a variable called populations.

Log to the console whether the array has 4 elements or not (true or false).

Create an array called percentages containing the percentages of the world population for these 4 population values. Use the function percentageOfWorld1 that you created earlier to compute the 4 percentage values.
*/
log("========= Introduction to Arrays ========");

let populationsArr = [1234, 4589, 4578, 1245];
let percentages = [];
for (let i = 0; i < populationsArr.length; i++) {
  let percentageTemp = percentageOfWorld3(populationsArr[i]);
  percentages.push(percentageTemp);
}
log(populationsArr);
log(populationsArr.length === 4);
log(percentages);

/* 
Answer: 
const populations = [10, 1441, 332, 83];

console.log(populations.length === 4);

const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3])
];

console.log(percentages);

--------------------------------------------

Basic Array Operations (Methods)
----------------------------------

Create an array containing all the neighbouring countries of a country of your choice. Choose a country which has at least 2 or 3 neighbours. Store the array into a variable called neighbours.

At some point, a new country called 'Utopia' is created in the neighbourhood of your selected country, so add it to the end of the neighbours array.

Unfortunately, after some time the new country is dissolved, so remove it from the end of the array.

If the neighbours array does not include the country 'Germany', log to the console: 'Probably not a central european country :D'.

Change the name of one of your neighbouring countries. To do that, find the index of the country in the neighbours array, and then use that index to change the array at that index position. For example, you can search for 'Sweden' in the array, and then replace it with 'Republic of Sweden'.
*/

log("========= Introduction to Arrays ========");
let neighbours = ["germany", "europe", "america", "africa"];
neighbours.push("Utopia");
neighbours.pop();
neighbours.push("Sweden");

if (!neighbours.includes("Germany")) {
  log("Probably not a central european country :D"); // logged because it case-sensitive
}
neighbours[neighbours.indexOf("Sweden")] = "Republic of Sweden";
log(neighbours);

/* 
Answer : 

const neighbours = ['Norway', 'Sweden', 'Russia'];

neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes('Germany')) {
  console.log('Probably not a central European country :D');
}

neighbours[neighbours.indexOf('Sweden')] = 'Republic of Sweden;';
console.log(neighbours);

-------------------------------------------------------------------------------

Introduction to Objects
----------------------------
Create an object called myCountry for a country of your choice, containing properties country, capital, language, population and neighbours (an array like we used in previous assignments).

*/
log("========= Introduction to Object  ========");

const myCountry = {
  country: "USA",
  capital: "DC",
  language: "English",
  population: 12,
  neighbours: ["germany", "europe", "america", "africa"],
};

log(myCountry);

/* 
Answer : 
const myCountry = {
  country: 'Finland',
  capital: 'Helsinki',
  language: 'finnish',
  population: 6,
  neighbours: ['Norway', 'Sweden', 'Russia']
};

------------------------------------------------

Dot vs. Bracket Notation
-------------------------
Using the object from the previous assignment, log a string like this to the console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki'.

Increase the country's population by two million using dot notation, and then decrease it by two million using bracket notation.

*/
log("========= Dot vs. Bracket Notation  ========");

log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} countries and capital called ${myCountry.capital}`
);

myCountry.population += 2;
log(myCountry);
myCountry["population"] -= 2;
log(myCountry);

/* 
Answer :
console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`
);

myCountry.population += 2;
console.log(myCountry.population);

myCountry['population'] -= 2;
console.log(myCountry.population);
----------------------------------------------

Object Methods
------------------
Add a method called describe to the myCountry object. This method will log a string to the console, similar to the string logged in the previous assignment, but this time using the 'this' keyword.

Call the describe method.

Add a method called checkIsland to the myCountry object. This method will set a new property on the object, called isIsland. isIsland will be true if there are no neighbouring countries, and false if there are. Use the ternary operator to set the property.
*/
myCountry.describe = function () {
  log(
    `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} countries and capital called ${this.capital}`
  );
};
myCountry.describe();
myCountry.checkIsland = function () {
  this.isIsland = this.neighbours.length === 0 ? true : false;
};
/* 
Answer :

const myCountry = {
  country: 'Finland',
  capital: 'Helsinki',
  language: 'finnish',
  population: 6,
  neighbours: ['Norway', 'Sweden', 'Russia'],
  describe: function() {
    console.log(
      `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`
    );
  },
  checkIsland: function() {
    this.isIsland = this.neighbours.length === 0 ? true : false;

    // Even simpler version (see why this works...)
    // this.isIsland = !Boolean(this.neighbours.length);
  }
};

myCountry.describe();
myCountry.checkIsland();

console.log(myCountry);

---------------------------------------

Iteration: The for Loop
----------------------------
There are elections in your country! in a small town, there are only 50 voters. Use a for loop to simulate the 50 people voting, by logging a string like this to the console (for numbers 1 to 50): 'Voter number 1 is currently voting'.
*/
log("===============Iteration: The for Loop================");
for (let i = 1; i <= 50; i++) {
  log(`Voter number ${i} is currently voting`);
}

/* 
Looping Arrays, Breaking and Continuing
----------------------------------------------
Let's bring back the populations array from a previous assignment.

Use a for loop to compute an array called percentages2 containing the percentages of the world population for the 4 population values. Use the function percentageWOrld1 that you created earlier.

Confirm that percentages2 contains exactly the same values as the percentages array that we created manually in the previous assignment, and reflect on how much better this solution is.

*/
log("=============== Looping Arrays, Breaking and Continuing ================");

let percentages2 = [];
for (let j = 0; j < populationsArr.length; j++) {
  percentages2.push(percentageOfWorld1(populationsArr[j]));
}
log(percentages2);

/* 
Answer :

const populations = [10, 1441, 332, 83];
const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}

console.log(percentages2);
------------------------------------------------
Looping Backwards and Loops in Loops
--------------------------------------------

Store this array of arrays into a variable called listOfNeighbours:

[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
Log only the neighbouring countries to the console, one by one, not the entire arrays. Log a string like 'Neighbour: Canada' for each country.

You will need a loop inside a loop for this. This is actually a bit tricky, so don't worry if it's too difficult for you! But you can still try to figure this out anyway 😉
*/
log("=============== Looping Backwards and Loops in Loops ================");

let array = [["Canada", "Mexico"], ["Spain"], ["Norway", "Sweden", "Russia"]];
for (let k = 0; k < array.length; k++) {
  const element = array[k];
  for (let x = 0; x < element.length; x++) {
    log(element[x]);
  }
}

/* 
Answer : 

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'],
  ['Norway', 'Sweden', 'Russia']
];

for (let i = 0; i < listOfNeighbours.length; i++)
  for (let y = 0; y < listOfNeighbours[i].length; y++)
    console.log(`Neighbour: ${listOfNeighbours[i][y]}`);

-----------------------------------------------------------------

The while Loop
--------------------
Recreate the challenge from the lecture Looping Arrays, Breaking and Continuing, but this time using a while loop (call the array percentages3).

Reflect on what solution you like better for this task: the for loop or the while loop?
*/
log("======================  The while Loop ========================--");
let percentages3 = [];

let a = 0;
while (a < populationsArr.length) {
  percentages3.push(percentageOfWorld1(populationsArr[a]));
  a++;
}
log(percentages3);

function log(value) {
  console.log(value);
}
/* 
Values and Variable
-------------------
Declare variables called country, continent and population and assign their values according to your own country (population in millions).

Log their values to the console.
*/
let country = "Portugal";
let continent = "Europe";
let population = 10;

console.log("======Values and Variable======");
console.log(country);
console.log(continent);
console.log(population);

/*
Answer :

let country = 'Portugal';
let continent = 'Europe';
let population = 10;

console.log(country);
console.log(continent);
console.log(population);
-------------------------------------------

Data Types
-----------
Declare a variable called isIsland and set its value according to your country. The variable should hold a Boolean value. Also declare a variable language, but don't assign it any value yet.

Log the types of isIsland, population, country and language to the console.
*/
const isIsland = false;
let language;

console.log("====== Data Types ======");
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

/* 
Answer :

let isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);
----------------------------------------------

let, const and var
------------------
Set the value of language to the language spoken where you live (some countries have multiple languages, but just choose one).

Think about which variables should be const variables (which values will never change, and which might change?). Then, change these variables to const.

Try to change one of the changed variables now, and observe what happens.
*/

log("========let, const and var==========");
language = "English";
// isIsland = true; // Uncaught TypeError: Assignment to constant variable.

/* 
Answer:

language = 'portuguese';
const country = 'Portugal';
const continent = 'Europe';
const isIsland = false;
isIsland = true;

-------------------------------------------
Basic Operators
---------------
If your country split in half, and each half would contain half the population, then how many people would live in each half?

Increase the population of your country by 1 and log the result to the console.

Finland has a population of 6 million. Does your country have more people than Finland?

The average population of a country is 33 million people. Does you country have less people than the average country?

Based on the variables you created, create a new variable description which contains a string with this format: 'Portugal is in Europe, and its 11 million people speak portuguese'.

*/

log("=========Basic Operators========");
// my code
let halfPopulation = population / 2;
population++;
let finlandPopulation = 6;
log(finlandPopulation > population);
log(population < 33);
log(halfPopulation);
log(
  country +
    " is in " +
    continent +
    ", and its " +
    population +
    " million people speak " +
    language +
    "."
);

/* 
Answer :

console.log(population / 2);

population++;

console.log(population);
console.log(population > 6);
console.log(population < 33);

const description1 =
  country +
  ' is in ' +
  continent +
  ', and its ' +
  population +
  ' million people speak ' +
  language;

console.log(description1);

-------------------------------------------

Strings and Template Literals
-----------------------------
Recreate the description variable from the last assignment, this time using the template literal syntax.
*/
log("========= Strig and Template Literals========");
let description = `${country} is in ${continent} ,and its ${population} million people speak ${language}.`;
log(description);

/* 
Answser :

const description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;

---------------------------------------------------

Taking Decisions: if / else Statements
-----------------------------------------
If your country's population is greater than 33 million, log a string like this to the console: "Portugal's population is 22 million below average" (the 22 is the average of 33 minus the country's population).

After checking the result, change the population temporarily to 13 and then to 130. See the different results, and set the population back to original.

*/
log("========= if statements ========");
if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}
population = 13;
if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}
population = 130;
if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}
population = 10;
/*
Answer : 

if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million
    below average`
  );
}
-----------------------------------------------------
Type Conversion and Coercion
-------------------------------
Predict the result of these 5 operations without executing them:
*/
log("========= Type Conversion ========");
console.log("9" - "5"); // -> 4
console.log("19" - "13" + "17"); // -> 617
console.log("19" - "13" + 17); // -> 23
console.log("123" < 57); // -> false
console.log(5 + 6 + "4" + 9 - 4 - 2); // -> 1143

//Execute the operations to check if you were right.

/* 
Equality Operators: == vs. ===
---------------------------------
Declare a variable numNeighbours based on a prompt input like this:

prompt('How many neighbour countries does your contry have?');
If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality == for now).

Use an else-if block to log 'More than 1 border' in case numNeighbours is greater than 1.

Use an else block to log 'No borders' (this block will be executed when numNeighbours is 0 or any other value).

Test the code with different values of numNeighbours, including 1 and 0.

Change == to ===, and test the code again, with the same values of numNeighbours. Notice what happens when there is exactly 1 border! Why is this happening?

Finally, convert numNeighbours to a number, and watch what happens now when you input 1.

Reflect on why we should use the === operator and type conversion in this situation.

*/

// let numNeighbours = prompt(
//   "How many neighbour countries does your contry have?"
// );
log("========= Equality operators ========");
let numNeighbours = 1;
//loose equality
if (numNeighbours == 1) {
  log("only 1 Border !");
} else if (numNeighbours > 1) {
  log("More than 1 border");
} else {
  log("No borders");
}

// strict equality
if (numNeighbours === 1) {
  // not show because it stirng === number
  log("only 1 Border !");
}
if (Number(numNeighbours) === 1) {
  log("only 1 Border !");
}

/* 
Answer : 
const numNeighbours = prompt(
  'How many neighbour countries does your country have?'
);

// LATER : This helps us prevent bugs
const numNeighbours = Number(
  prompt('How many neighbour countries does your country have?')
);

if (numNeighbours === 1) {
  console.log('Only 1 border!');
} else if (numNeighbours > 1) {
  console.log('More than 1 border');
} else {
  console.log('No borders');
}
-------------------------------------------------------------------

Logical Operators
------------------
Comment out the previous code so the prompt doesn't get in the way.

Let's say Sarah is looking for a new country to live in. She wants to live in a country that speaks English, has less than 50 million people and is not an island.

Write an if statement to help Sarah figure out if your country is right for her. You will need to write a condition that accounts for all of Sarah's criteria. Take your time with this, and check part of the solution if necessary.

If yours is the right country, log a strings like this 'You should live in Portugal :)'. If not, log 'Portugal does not meet your criteria :('.

Probably your country does not meet all the criteria. So go back and temporarily change some variables in order to make the condition true (unless you live in Canada :D).
*/

// sarah criteria
//language is english, less than 50 million, not an island

log("========= Logical Operators========");
if (population < 50 && language === "English" && !isIsland) {
  log(`You should live in ${country}`);
} else {
  log(`${country} does not meet your criteria :(`);
}

/* 
Answer : 
if (language === 'english' && population < 50 && !isIsland) {
  console.log(`You should live in ${country} :)`);
} else {
  console.log(`${country} does not meet your criteria :(`);
}

---------------------------------------------------------------

The switch Statement
---------------------
Use a switch statement to log the following string for the given language:

chinese or mandarin: 'MOST number of native speakers!';

spanish: '2nd place in number of native speakers';

english: '3rd place';

hindi: 'Number 4';

arabic: '5th most spoken language';

for all other simply log 'Great language too :D'.


*/
log("========= Swtich Statement ========");
switch (language) {
  case "Chinese":
    log("MOST number of native speakers!");
    break;
  case "Mandarin":
    log("MOST number of native speakers!");
    break;
  case "Spanish":
    log("2nd place in number of native speakers");
    break;
  case "English":
    log("3rd place");
    break;
  case "Hindi":
    log("Number 4");
    break;
  case "Arabic":
    log("5th most spoken language");
    break;

  default:
    log("Great language too :D");
    break;
}

/* 
Answer :
switch (language) {
  case 'chinese':
  case 'mandarin':
    console.log('MOST number of native speakers!');
    break;
  case 'spanish':
    console.log('2nd place in number of native speakers');
    break;
  case 'english':
    console.log('3rd place');
    break;
  case 'hindi':
    console.log('Number 4');
    break;
  case 'arabic':
    console.log('5th most spoken language');
    break;
  default:
    console.log('Great language too :D');
}
------------------------------------------------
The Conditional (Ternary) Operator
---------------------------------------
If your country's population is greater than 33 million, use the ternary operator to log a string like this to the console: "Portugal's population is above average". Otherwise, simply log "Portugal's population is below average". Notice how only one word change between these two sentences!

After checking the result, change the population temporarily to 13 and then to 130. See the different results, and set the population back to original.
*/
log("========= Ternary Operators========");
log(
  `${country}'s population is ${population > 33 ? "above" : "below"} average`
);

/* 
Answer : 

console.log(
  `${country}'s population is ${population > 33 ? 'above' : 'below'} average`
);
*/

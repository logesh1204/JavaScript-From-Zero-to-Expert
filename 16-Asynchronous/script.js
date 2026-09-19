'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
/* -------------------------- Our First AJAX Call: XMLHttpRequest ------------------------------- */
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText).find(c => c.name === country);
    console.log(data);
    const html = `<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 10000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️ </span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰 </span>${data.currencies[0].name}</p>
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
// getCountryData('United States of America');
// getCountryData('India');

/* -------------------------- [OPTIONAL] How the Web Works: Requests and Responses ------------------------------- */
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️ </span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰 </span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText).find(c => c.name === country);
    // console.log(JSON.parse(this.responseText));
    console.log(data);
    // country 1
    renderCountry(data);

    // Neighbour country
    const [neighbour] = data.borders;

    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      // console.log(JSON.parse(this.responseText));
      console.log(data2);
      // country 2
      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('Portugal');
// getCountryAndNeighbour('India');

/* -------------------------- Consuming Promises ------------------------------- */
/* -------------------------- Chaining Promises ------------------------------- */

//  cp => Consuming Promises

/* const getCountryDataCP = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); // json is method to read the body in response and it return new promise as result
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
}; */

// In simple
const getCountryDataCP = function (country) {
  //   country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => response.json()) // json is method to read the body in response and it return new promise as result
    .then(data => {
      renderCountry(data[0]);
      //   console.log(data);
      // Chaining Promises
      const neighbour = data[0].borders[0];
      //   console.log(neighbour);
      if (!neighbour) return;
      // country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    // Handling Rejected Promises
    .catch(err => {
      console.error(err, err.message);
      renderError(`Something went wrong ${err.message},Try again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
// getCountryDataCP('Portugal');
/* -------------------------- Handling Rejected Promises ------------------------------- */

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/* -------------------------- Throwing Errors Manually ------------------------------- */
/* const getCountryDataErr = function (country) {
  //   country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error('Country not Found ' + response.status);

      return response.json();
    }) // json is method to read the body in response and it return new promise as result
    .then(data => {
      renderCountry(data[0]);
      //   console.log(data);
      // Chaining Promises
      //   const neighbour = data[0].borders[0];
      const neighbour = 'e3r';
      if (!neighbour) return;
      // country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error('Country not Found ' + response.status);

      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    // Handling Rejected Promises
    .catch(err => {
      //console.error(err, err.message);
      renderError(`Something went wrong ${err.message},Try again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}; */

// In simple
const getJson = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // console.log(response);
    if (!response.ok) throw new Error(errMsg);

    return response.json();
  });
};

const getCountryDataErr = function (country) {
  //   country 1
  getJson(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not Found'
  ) // json is method to read the body in response and it return new promise as result
    .then(data => {
      renderCountry(data[0]);
      //   console.log(data);
      // Chaining Promises
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // country 2
      return getJson(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not Found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    // Handling Rejected Promises
    .catch(err => {
      //console.error(err, err.message);
      renderError(`Something went wrong ${err.message},Try again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// getCountryDataErr('australia');
/* -------------------------- The Event Loop in Practice ------------------------------- */
/* console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  // for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

console.log('Test end'); */

/* -------------------------- Building a Simple Promise ------------------------------- */
/* 
const lottery = new Promise(function (resolve, reject) {
  console.log('Lotery draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win');
    } else {
      reject(new Error('You Lose'));
      // reject('You Lose');
    }
  }, 2000);
});

lottery.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
// Promisifying setTimeout
wait(1)
  .then(() => {
    console.log('1 second Passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second Passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second Passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second Passed');
    return wait(1);
  });

Promise.resolve('Success').then(res => console.log(res));
Promise.reject(new Error('line 25 is Error')).catch(res => console.error(res)); */

/* -------------------------- Promisifying the Geolocation API ------------------------------- */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // In simple
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition()
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

const whereAmI = function () {
  getPosition()
    .then(res => {
      // console.log(res.coords);
      const { latitude: lat, longitude: lng } = res.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then(function (response) {
      if (!response.ok) throw new Error('Country Not Found');
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[1]); // data[1] is for india
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    });
};
btn.addEventListener('click', whereAmI);

/* -------------------------- Consuming Promises with Async/Await ------------------------------- */

async function hello() {
  return 'hello';
}
// prettier-ignore
async function test() {
  console.log(await hello());
}
// test();

const whereAmIAsync = async function () {
  try {
    // geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // reversed geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting Geolocation');
    const dataGeo = await resGeo.json();

    console.log(`You are in ${dataGeo.city}, ${dataGeo.countryName}`);

    //country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();

    renderCountry(data[1]);
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    renderError(err);
    throw new Error(err);
  }
};

// whereAmIAsync();

/* -------------------------- Error Handling With try...catch ------------------------------- */

// Simple Example
try {
  let y = 9;
  const x = 78;
  x = 88;
  console.log(x);
} catch (err) {
  console.log(err.message);
}

/* -------------------------- Returning Values from Async Functions ------------------------------- */

console.log('1: Will get location');

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err}`);
  }
  console.log('3: Finished getting location');
})();

/* -------------------------- Running Promises in Parallel ------------------------------- */

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJson(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJson(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // in Parallel run (check network )
    const data = await Promise.all([
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJson(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

/* --------------------------  Other Promise Combinators: race, allSettled and any ------------------------------- */

(async function () {
  const data = await Promise.race([
    getJson(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/germany`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/mexico`),
  ]);
  console.log(data[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJson(`https://countries-api-836d.onrender.com/countries/name/tanzania`),
  timeout(0.7),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Not Success'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Not Success'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.any([
  Promise.resolve('1 Success'),
  Promise.reject('2:Not Success'),
  Promise.resolve('3 Success'),
])
  .then(res => console.log(`from any : ${res}`))
  .catch(err => console.log(err));

const p1 = Promise.reject('Server 1 failed');

const p2 = new Promise(resolve => {
  setTimeout(() => resolve('Server 2 success'), 2000);
});

const p3 = new Promise(resolve => {
  setTimeout(() => resolve('Server 3 success'), 1000);
});

Promise.any([p1, p2, p3])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

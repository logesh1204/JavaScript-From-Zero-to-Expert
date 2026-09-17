'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

/* -------------------------- Using the Geolocation API ------------------------------- */

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       //   console.log(position);
//       const { longitude, latitude } = position.coords;
//       console.log(longitude, latitude);

//       map = L.map('map').setView([latitude, longitude], 12);
//       //   Displaying a Map Using LeafletLibrary
//       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       L.marker([latitude, longitude])
//         .addTo(map)
//         .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//         .openPopup();
//       // End Displaying a Map Using LeafletLibrary
//       // Adding Marker in map with popup when locations is clicked
//       map.on('click', function (event) {
//         //Rendering Workout Input Form -> marker move to form handler
//         mapEvent = event;
//         form.classList.remove('hidden');
//         inputDistance.focus();
//       });
//       // End of Adding Marker in map with popup when locations is clicked
//     },
//     function () {
//       console.log('Could not get Your Position');
//     }
//   );
// }

//  Rendering Workout Input Form
/* form.addEventListener('submit', function (e) {
  e.preventDefault();

  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';

  // console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        maxWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
}); */

/* inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
}); */
// End Rendering Workout Input Form

/* -------------------------- Above code are before Refactoring for Project Architecture ------------------------------- */
// Refactoring for Project Architecture

// Application Architecture
class App {
  #map;
  #mapEvent;
  #mapZoomlevel = 13;
  #workouts = [];
  constructor() {
    this._getPostion();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPostion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.log('Could not get Your Position');
        }
      );
    }
  }

  _loadMap(position) {
    //   console.log(position);
    const { longitude, latitude } = position.coords;
    console.log(longitude, latitude);

    this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomlevel);
    //   Displaying a Map Using LeafletLibrary
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 500,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(event) {
    this.#mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // Helper function
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // check if data is Valid
    // if workout Running, create Running Object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      console.log(
        !validInputs(distance, duration, cadence),
        !allPositive(distance, duration, cadence)
      );
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Input have to be positive number');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if workout  Cycling, create Cycling Object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Input have to be positive number');
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to the Workout Array
    this.#workouts.push(workout);
    // Render workout on map marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkout(workout);
    // Hide form + clear input fields
    this._hideForm();
    // store the workout in local storage
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;
    if (workout.type === 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }
    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevation}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  // Move to Marker OnClick
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;
    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomlevel, {
      animate: true,
      pan: { duration: 1 },
    });
    // public interface
    // workout.click();
  }
  //Working with localStorage
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;
    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload(); // invoke from console
  }
}

const app = new App();
// End Refactoring for Project Architecture

/* -------------------------- ManagingWorkoutData:CreatingClasses ------------------------------- */

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);

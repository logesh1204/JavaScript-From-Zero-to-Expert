'use strict';
function log(value) {
  console.log(value);
}

/* ------- Projext 2 : Modal window -------- */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const showModal = document.querySelectorAll('.show-modal');

log(showModal);

for (let i = 0; i < showModal.length; i++) log(showModal[i].textContent);

/* ------- working with class -------- */
/* 
    .classList : return all the class of element
    .classList.remove() : remove the class from the elment
    .classList.add() : add a class in element
*/
for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

/* ------- Handling esc keypress event -------- */
/* 
    e: e is object that is create when event is occurs and the object can be accessed by pass as a parameter in function.

    we can give any name for that object,Here I gave as e

    .classList.contains() : check whether the class preseant in the element
*/
document.addEventListener('keydown', function (e) {
  log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

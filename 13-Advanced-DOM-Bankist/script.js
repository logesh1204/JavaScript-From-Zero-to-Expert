'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// old way
// for (let i = 0; i < btnsOpenModal.length; i++) old way
// btnsOpenModal[i].addEventListener('click', openModal);

// New Way
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* -------------------------- Selecting, Creating, and Deleting Elements ------------------------------- */

// Selecting

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));
const allSections = document.querySelectorAll('.section');

console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');

console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent = "We use cookied for improved functionally and analytics"

message.innerHTML =
  "We use cookied for improved functionally and analytics <button class ='btn btn--close-cookie'>Got it!</button>";

const header = document.querySelector('.header');

// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Deleteing
/*
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // old way
  // message.parentElement.removeChild(message);
});
*/
/* --------------------------  Styles, Attributes and Classes------------------------------- */

// style

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); //does have any innline style
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// cutsom style (:root) can be changed

// document.documentElement.style.setProperty('--color-primary', 'red');

// attributes
const log = document.querySelector('.nav__logo');
console.log(log.alt);
console.log(log.className);

log.alt = 'Beautiful logo';
// Non-standard
console.log(log.designer);
console.log(log.getAttribute('designer'));

console.log(log.src); // absolute path
console.log(log.getAttribute('src')); //relative path

// Data Attribute
console.log(logo.dataset.versionNumber);

// classes

log.classList.add('hi');
log.classList.remove('hi');
log.classList.toggle('hi');
console.log(log.classList.contains('hi'));

/* --------------------------  Implementing Smooth Scrolling------------------------------- */

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log(
    ' height/width viewport : ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  console.log(' Current Scroll X : ', window.pageXOffset, scrollX);
  console.log(' Current Scroll Y : ', window.pageYOffset, scrollY);

  //scrolling
  // window.scroll(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scroll({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/* --------------------------  Types of Events and Event Handlers------------------------------- */

const h1 = document.querySelector('h1');

const altmessage = function (e) {
  console.log('addEventlistener : Grreat You are reading the heading 1:D');
};
h1.addEventListener('mouseenter', altmessage);

setTimeout(() => h1.removeEventListener('mouseenter', altmessage), 3000);
// h1.onmouseenter = function (e) {
//   console.log('addEventlistener : Grreat You are reading the heading 2:D');
// };

/* -------------------------- Event Propagation in Practice ------------------------------- */

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

/* document.querySelector('.nav__link').addEventListener('click', function (e) {
  // e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('link : ', e.target, e.currentTarget);

  // stop  propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('container : ', e.target, e.currentTarget);
}); */
// document.querySelector('.nav').addEventListener('click', function (e) {
//   // e.preventDefault();
//   this.style.backgroundColor = randomColor();

//   console.log('nav : ', e.target, e.currentTarget);
// });

// capturing
// addEvenListner(event,callback,capture(true || false))
/* document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    // e.preventDefault();
    this.style.backgroundColor = randomColor();

    console.log('nav : ', e.target, e.currentTarget);
  },
  true
); */

/* --------------------------  Event Delegation: Implementing Page Navigation------------------------------- */

// Bubbling (add event to all nav links)

/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */

// Delegation (add event to parent and traget  the event happened the element)

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// App -> Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/* -------------------------- DOM Traversing ------------------------------- */

// Going dowards: child
console.log('H1 : ', h1);
console.log(
  'H1 child by querySelectorAll: ',
  h1.querySelectorAll('.highlight')
);
console.log('H1 childNodes: ', h1.childNodes);
console.log('H1 children: ', h1.children);
console.log('H1 firstElementChild: ', h1.firstElementChild);
console.log('H1 lastelementChild: ', h1.lastElementChild);
console.log('H1 firstChild: ', h1.firstChild);
console.log('H1 lastChaild: ', h1.lastChild);

// Going upwards : parents

console.log(h1.parentElement);
console.log(h1.parentNode);

// closest -> return nearest parent ir matching element
console.log(h1.closest('.header'));
console.log(h1.closest('h1'));

// going Sideways : siblings

// can select direct sibling

console.log(' h1 previous siblings ', h1.previousElementSibling);
console.log(' h1 next siblings ', h1.nextElementSibling);
console.log(' h1 pervious siblings ', h1.previousSibling);
console.log(' h1 next siblings ', h1.nextSibling);

/* --------------------------  Building a Tabbed Component------------------------------- */

// App -> Tabbed Component

const tab = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  // targeting element
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // remove active class from tab and content
  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/* -------------------------- Passing Arguments to Event Handlers ------------------------------- */

// app -> menu fade animation

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const parent = e.target.closest('.nav');
    const siblings = parent.querySelectorAll('.nav__link');
    const logo = parent.querySelector('img');

    siblings.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/* -------------------------- Implementing a Sticky Navigation: The Scroll Event ------------------------------- */

const initialCoords = section1.getBoundingClientRect();

console.log(initialCoords);
window.addEventListener('scroll', function () {
  //console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

/* --------------------------  A Better Way: The Intersection Observer API------------------------------- */

// Example

/* const obsCallback = function (entries, Observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null, // viewport
  threshold: [0, 0.2],
};
const Observer = new IntersectionObserver(obsCallback, obsOptions).observe(
  section1
);
 */

// App -> sticky  Navigation improve
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting === false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});
headerObserver.observe(header);

/* -------------------------- Revealing Elements on Scroll ------------------------------- */

// App -> section reaveal animation

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    // Fixing a Small Scrolling Bug
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/* -------------------------- Fixing a Small Scrolling Bug ------------------------------- */

/* 
  changing the revealSection single to all entries  by loop because when referesh the intersecting section ae not  displayed
 */

/* -------------------------- Lazy Loading Images ------------------------------- */
const imgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach(img => imgObserver.observe(img));

/* -------------------------- Building a Slider Component: Part 1 ------------------------------- */
/* -------------------------- Building a Slider Component: Part 2 ------------------------------- */
const slider = function () {
  const slide = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotConatiner = document.querySelector('.dots');

  let curSlide = 0;
  let maxSlide = slide.length;

  const createDots = function () {
    slide.forEach((_, i) => {
      dotConatiner.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide =${i}></button>`
      );
    });
  };
  const Activedot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (curSlide) {
    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    Activedot(curSlide);
  };
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    Activedot(curSlide);
  };

  goToSlide(0);
  createDots();
  Activedot(0);
  // above function can set inside a function called init() all the three  invoke in one sinle funtion
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotConatiner.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      // console.log(Number(e.target.dataset.slide));
      goToSlide(curSlide);
      Activedot(curSlide);
    }
  });
};
slider();

/* -------------------------- Lifecycle DOM Events  ------------------------------- */

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'hi';
// });

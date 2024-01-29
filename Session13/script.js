'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**start */

/**<-----------------------------------------------------------> */
//190:type of events and event handlers
/*
const h1 = document.querySelector('h1')
const alearH1=()=>{
  alert('addEvenlistener: great! you are reading the heading')
}

h1.addEventListener('mouseenter',alearH1)
setTimeout(()=>{
  h1.removeEventListener('mouseenter',alearH1)
}, 3000)


/**<-----------------------------------------------------------> */
//189: implementing Smooth Scrolling (lab5 5.2)

btnScrollto.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(window.pageXOfset);
  console.log(window.pageYOffset);

  console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.clientWidth);

  scroll;
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  section1.scrollIntoView({ behavior: 'auto' });
});
// window.scrollTo(
//   {
//    left: s1coords.left +window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   }
// )
/**<-----------------------------------------------------------> */
//192: Event Propagation in practice lab 5 5.3
//rgb(255, 255, 255)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());
document.querySelector('.nav__link').addEventListener('click', e => {
  e.currentTarget.style.backgroundColor = randomColor();
  console.log('link', e.target, e.currentTarget);
  // e.stopPropagation()
});
document.querySelector('.nav__links').addEventListener('click', e => {
  e.currentTarget.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', e => {
  e.currentTarget.style.backgroundColor = randomColor();
  console.log('nav', e.target, e.currentTarget);
});

/**<-----------------------------------------------------------> */
//193: event Delegation: Implementing page Navigation lab 5 5.4
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
// document.querySelector('.nav__links').addEventListener('click',(e)=>{
//     e.preventDefault()

//     //Matching strategy
//     if(e.target.classList.contains('.nav__link')){
//       const id = e.target.getAttribute('href');
//       document.querySelector(id).scrollIntoView({
//         behavior: 'smooth'
//     })
//     console.log(id)

//     }
// })

/**<-----------------------------------------------------------> */
//194: Dom Travesing
/*

const h1 = document.querySelector('h1')

//going downwards: child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color='white'
h1.lastElementChild.style.color='white'

//going upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElement)

// h1.closest('.header').style.backgroundColor=

//going sideways:siblings
console.log(h1.previousElementSibling)
console.log(h1.nextSibling)
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((element)=>{
  if(element!==h1){
    element.style.backgroundColor='blue'
  }
})




/**<-----------------------------------------------------------> */
//195: bulding a tabbed Component lab 6.1
//tabed component

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  // console.log(clicked.dataset.tab)
  //activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
/**<-----------------------------------------------------------> */
//197 implementing a stichy navigation: The scroll event| lab6.2
//sticky navigation
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', e => {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

/**<-----------------------------------------------------------> */
//201: Buiding a Slider Component | lab6.3-4
//slide

const slider = function () {
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  // slider.style.transform='cale(0.4) translateX(-800px)';
  // slider.style.overflow= 'visible';

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${i}"></button>
    `
      );
    });
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let curSlide = 0;
  let maxSlide = slides.length;

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`; // -100%, 0%, 100%, 200%,
    });
    activateDot(curSlide);
  };
  const preSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`; // -100%, 0%, 100%, 200%,
    });
    activateDot(curSlide);
  };
  const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`; // -100%, 0%, 100%, 200%,
    });
  };

  //next slide

  const init = function () {
    gotoSlide(0);
    activateDot(0);
  };
  init();

  //event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', preSlide);

  //part2
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      preSlide();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
    }
  });
};
slider();

/**<-----------------------------------------------------------> */

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('html Parsed and DOM free buitl!', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = 'message';
});

/**<-----------------------------------------------------------> */
//196:passing arguments to event handlers
//Menu fade animation

const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handlerHover.bind(0.5));

nav.addEventListener('mouseout', handlerHover.bind(1));

/**<-----------------------------------------------------------> */
//  187:Selecting, creating and delete element
//selectin elements
/*
console.log(document.documentElement)
console.log(document.head)
document.querySelector('.header');
const allSelections= document.querySelectorAll('.section')
console.log(allSelections)

document.getElementById('section--1')
const allButtons=document.querySelectorAll('button')
console.log(allButtons)

//creating and inserting elements
//.insertAdjacentHTML
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML='We use cookie for improved functionality. <button class="btn btn--close-cookie">Got it!</button>'
const header=document.querySelector('.header')

// header.before(message)truowcs element
header.append(message)//trong element
// header.after(message) sau element

document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
  // message.remove();
  message.parentElement.removeChild(message)

})
/**<-----------------------------------------------------------> */
//188:styles, Atributes and Classes
/*
message.style.backgroundColor='blue'
message.style.width='120%'

console.log(message.style.backgroundColor)

console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).height)

message.style.height=Number.parseFloat(getComputedStyle(message).height,10) + 40 + 'px'
console.log(getComputedStyle(message).height)

document.documentElement.style.setProperty('--color-primary', 'orangered')

//attributes
const logo =document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)

//non-standard
console.log(logo.designer)//tự định nghĩa k lấy được thuộc tính
console.log(logo.getAttribute('designer'))
logo.setAttribute('company','bankist')
console.log(logo.getAttribute('src'))

const link = document.querySelector('.nav__link--btn')
console.log(link.href)
console.log(link.getAttribute('href'))

//data attributes
console.log(logo.dataset.versionNumber)

//classes
logo.classList.add('c', 'j')
logo.classList.remove('c','j')
logo.classList.toggle('c')
logo.classList.contains('c')

//don't use
logo.className= 'chucdoan'




/**<-----------------------------------------------------------> */

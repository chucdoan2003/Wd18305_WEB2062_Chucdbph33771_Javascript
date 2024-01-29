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

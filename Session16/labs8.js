'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
//257: coding challenge 1 lab 8.1

//1:
const whereAmi = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`you are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message}`));
};
whereAmi(52.508, 13.381);

/**<--------------------------------------------------------> */
//262: coding challenge 2: lab 8.2
//wait
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('image 1 loaded');
    return wait(2);
  })
  .then(() => {
    // currentImg = img;
    currentImg.style.display = 'none';
    // return createImage('img/img-2.jpg');
  })
  .then(img => {
    console.log('image 2 loaded');
  })
  .catch(err => console.log(err));

/**<--------------------------------------------------------> */
//coding challenge 3: lab 8.3
//part1
const loadNPause = async function () {
  try {
    //load image 1
    let img1 = await createImage('img/img-1.jpg');
    await wait(2);
    img1.style.display = 'none';
    //load image 1
    let img2 = await createImage('img/img-2.jpg');
    await wait(2);
    img2.style.display = 'none';
    //load image 1
    let img3 = await createImage('img/img-3.jpg');
    await wait(2);
    img3.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

//part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
    console.log(imgsEl);
  } catch (err) {
    console.log(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

/**<--------------------------------------------------------> */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmi2 = function () {
  getPosition()
    .then(post => {
      console.log(post);
      const { latitude: lat, longitude: lng } = post.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Country not found`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message}`));
};

btn.addEventListener('click', whereAmi2);

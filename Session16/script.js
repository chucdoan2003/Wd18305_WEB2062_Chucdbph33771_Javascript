'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//start
/**<--------------------------------------------------------> */
//250: Out first Ajax Call: XMLHttpRequest
const renderCountry = data => {
  const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed()} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderCountryNeight = datas => {
  datas.forEach(data => {
    const html = `<article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed()} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
const getCountryData = function (country) {
  //AJAX call country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render country 1;
    renderCountry(data);

    //get neightbour country (2)

    const neighbour = data.borders?.[0];
    console.log(neighbour);
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/name/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountryNeight(data2);
    });
  });
};

// getCountryData('portugal')
/**<--------------------------------------------------------> */
//251: Callback hell

// setTimeout(()=>{
//     console.log('1')
//     setTimeout(()=>{
//         console.log('2')
//         setTimeout(()=>{
//             console.log('3')
//             setTimeout(()=>{
//                 console.log('4')
//             },1000)
//         },1000)
//     },1000)
// },1000)

/**<--------------------------------------------------------> */
//253consuming promise

////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
const getJson = function (url, error = 'something went wrong!') {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(error);
    } else {
      return res.json();
    }
  });
};

const request = fetch('https://restcountries.com/v2/name/portugal');

const getCountryData2 = function (country) {
  getJson(`https://restcountries.com/v2/name/${country}`, 'country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error(`Neightbour not found`);
      return getJson(
        `https://restcountries.com/v2/name/${neighbour}`,
        'Neightbour not found'
      );
    })
    .then(data => renderCountryNeight(data))
    .catch(err => {
      renderError(`some thing went wrong ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
  // .then(data=>renderCountry(data[0]))
};
// btn.addEventListener('click', function () {
//   getCountryData2('portugal');
// });
/**<--------------------------------------------------------> */
//257: coding challenge 1 lab 8.1

//1:
// const whereAmi = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`you are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`${err.message}`));
// };
// whereAmi(52.508, 13.381);

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
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    console.log('image 2 loaded');
  })
  .catch(err => console.log(err));

/**<--------------------------------------------------------> */
//259: the event loop practice
// console.log('Test start')
// setTimeout(()=>console.log('o sec timer'),0)
// Promise.resolve('Resolved promise 1').then(res=>console.log(res))
// Promise.resolve('Resolved promise 2').then(res=>{
//     for(let i = 0; i<100;i++){
//         console.log(res)
//     }

// })

// console.log('Test end')
/**<--------------------------------------------------------> */
//260: building a simple promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happenning');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win');
    } else {
      reject(new Error(`you lost your money`));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// pomisingfying setTimeout
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('pass 1 seconds');
    return wait(2);
  })
  .then(() => {
    console.log('pass 2 seconds');
    return wait(3);
  })
  .then(() => {
    console.log('pass 3 seconds');
    return wait(4);
  })
  .then(() => {
    console.log('pass 4 seconds');
    return wait(2);
  });
/**<--------------------------------------------------------> */

//261: promisifying the geolocation api
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmi = function () {
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

btn.addEventListener('click', whereAmi);
/**<--------------------------------------------------------> */

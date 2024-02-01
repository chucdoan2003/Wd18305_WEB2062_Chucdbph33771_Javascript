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

//163: Consuming Promises with Async/Await
const whereAmi2 = async function () {
  try {
    // const pos = await getPosition();
    // const { latitude: lat, longitude: lng } = pos.coords;
    // //reverse geocoding
    // const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // if (!resGeo.ok)
    //   throw new Error('Problem getting location data something wrong');

    // const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // const a = fetch(`https://restcountries.com/v2/name/${country}`);
    const res = await fetch(`https://restcountries.com/v2/name/vietnam`);
    if (!res.ok) throw new Error('Problem with country ');
    const data = await res.json();
    renderCountry(data[0]);

    return `you are viet nam`;
    // console.log(res);
    // console.log(data);
  } catch (err) {
    console.log(err);
    renderError(`some thing error ${err.message}`);
  }
};
// console.log('1: started');

// (async function () {
//   try {
//     const mycountry = await whereAmi2();
//     console.log(mycountry);
//   } catch (err) {
//     renderError(err.message);
//   }
//   console.log(`3: end`);
// })();

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

/**<--------------------------------------------------------> */
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);

    const data = await Promise.all([
      getJson(`https://restcountries.com/v2/name/${c1}`),
      getJson(`https://restcountries.com/v2/name/${c2}`),
      getJson(`https://restcountries.com/v2/name/${c3}`),
    ]);
    const data2 = Promise.all([
      getJson(`https://restcountries.com/v2/name/${c1}`),
      getJson(`https://restcountries.com/v2/name/${c2}`),
      getJson(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
    console.log(data2);
    data2.then(data => {
      console.log(data.map(d => d[0].capital));
    });
  } catch (err) {
    console.log(err);
  }
};
// get3Countries('vietnam', 'china', 'usa');

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

/**<--------------------------------------------------------> */

"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint) // fetch returns a promise
  .then(blob => blob.json()) // then we can modify our "blob" of data to json and get another promise
  .then(data => cities.push(...data)) // then we can push data into our array but we need to use the spread operator (...)

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi'); // g - stands for global (entire array will be searched through) and i - stands for insensitive (lowercase and uppercase will be matched)
    return place.city.match(regex) || place.state.match(regex);
  })
}
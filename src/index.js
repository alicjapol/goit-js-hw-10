import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
import Notiflix from 'notiflix';


axios.defaults.headers.common['x-api-key'] = 'live_FGH9lasd0oul4RhK4aaXXVevkdqzPmluPpIdqRAPTVq9GAtoohZ7VPmrFhJI1oqr';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    const options = data.data;

    loader.style.display = 'none';
    error.style.display = 'none';

    breedSelect.innerHTML = options
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    breedSelect.style.display = 'block';
  })
  .catch(() => {
    loader.style.display = 'none';
    error.style.display = 'block';
  });

breedSelect.addEventListener('change', event => {
  error.style.display = 'none';
  loader.style.display = 'block';
  const breed = event.target.value;

  fetchCatByBreed(breed)
    .then((data) => {
      const catData = data.data[0].breeds[0];

      if (catData) {
        catInfo.innerHTML = `
          <p>${catData.name}</p>
          <p>${catData.description}</p>
          <p>${catData.temperament}</p>
          <img src='${data.data[0].url}' >`;
      } else {
        catInfo.innerHTML = Notiflix.Notify.failure('No information available for this breed');
      }

      loader.style.display = 'none';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =  'live_FGH9lasd0oul4RhK4aaXXVevkdqzPmluPpIdqRAPTVq9GAtoohZ7VPmrFhJI1oqr';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loading-cat'); // Zaktualizowane dla nowej animacji kota
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.style.display = 'none';
catInfo.style.display = 'none';

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
  const breedId = event.target.value;

  error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(data => {
      if (data.data.length > 0 && data.data[0].breeds.length > 0) {
        const catData = data.data[0].breeds[0];

        catInfo.innerHTML = `
          <h4>${catData.name}</h4>
          <p>${catData.description}</p>
          <p>${catData.temperament}</p>
          <img src='${data.data[0].url}' alt='${catData.name}'>`;

        loader.style.display = 'none';
        catInfo.style.display = 'block';
      } else {
        Notiflix.Notify.failure('No information available for this breed');
        loader.style.display = 'none';
      }
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});

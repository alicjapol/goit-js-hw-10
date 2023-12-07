import axios from 'axios';

// Ustaw klucz API
axios.defaults.headers.common['x-api-key'] =
  'live_FGH9lasd0oul4RhK4aaXXVevkdqzPmluPpIdqRAPTVq9GAtoohZ7VPmrFhJI1oqr';

export const fetchBreeds = () => {
  return axios.get('https://api.thecatapi.com/v1/breeds');
};

export const fetchCatByBreed = (breedId) => {
    
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
};

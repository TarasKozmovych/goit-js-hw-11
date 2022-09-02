import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/?';

async function searchData(data, page) {
    const params = new URLSearchParams({
        key: '29665517-503a19893477763dfc63054fb',
        q: data,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
    });

    return await axios.get(`${BASE_URL}${params}`);
};
function createMarkup(images) {
    return images
        .map(image => {
            return `
        <div class="gallery__item">
          <a class="gallery__link" href="${image.largeImageURL}">
              <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="gallery__info">
              <p class="gallery__info-item">
                  <b>Likes ${image.likes}</b>
              </p>
              <p class="gallery__info-item">
                  <b>Views ${image.views}</b>
              </p>
              <p class="gallery__info-item">
                  <b>Comments ${image.comments}</b>
              </p>
              <p class="gallery__info-item">
                  <b>Downloads ${image.downloads}</b>
              </p>
          </div>
      </div>`;
        })
        .join('');
};
const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};
const gallery = new SimpleLightbox('.gallery a', {
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});
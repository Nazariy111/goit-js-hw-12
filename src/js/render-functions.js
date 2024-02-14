const PAGE_SIZE = 15;
let query = '';
let currentPage = 1;
let totalHits = 0;

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery-box'),
    btnEl: document.querySelector('.search-btn'),
    btnLoadMore: document.querySelector('.load-btn'),
};




function imageTemplate({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<a class="gallery-link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`;
};

function renderImages(arr) {
    const markup = arr.map(imageTemplate).join('');
    const gallery = refs.galleryEl.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
};
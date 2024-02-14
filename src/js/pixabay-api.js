import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

let query = '';
let currentPage = 1;
let totalHits = 0;
const PAGE_SIZE = 15;


let simpleLightBox;

async function getImage() {
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PAGE_SIZE}`;
    const url = `${BASE_URL}${END_POINT}${PARAMS}`;
    const res = await axios.get(url);
    return res.data;
};


export const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery-box'),
    btnEl: document.querySelector('.search-btn'),
    btnLoadMore: document.querySelector('.load-btn'),
};

const loader = document.querySelector('.loader-box');

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);
refs.formEl.addEventListener('input', e => {
    const searchWord = refs.formEl.elements.word.value.trim();
    if (searchWord) {
        refs.btnEl.disabled = false;
        refs.btnEl.classList.remove('disabled');
    };
});

async function onLoadMoreClick() {
    currentPage += 1;
    const data = await getImage();
    renderImages(data.hits);
    simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }).refresh();
    checkBtnStatus();
};




async function onFormSubmit(e) {
    e.preventDefault();
    refs.formEl.insertAdjacentHTML("afterend", '<div class="loader-box "><span class="loader"></span></div>');
    const galleryParentElem = document.querySelector('.gallery');
    if (galleryParentElem) {
        galleryParentElem.remove();
    };
    const loader = document.querySelector('.loader-box');
    query = e.target.elements.word.value.trim();
    currentPage = 1;
    try {
        const data = await getImage();
        totalHits = data.totalHits;
        const galleryParentElemMarkup = '<div class="gallery"></div>';
        refs.galleryEl.insertAdjacentHTML("afterbegin", galleryParentElemMarkup);

        if (query) {
            if (data.hits.length > 0) {
            loader.remove();
            renderImages(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }).refresh();
            } else {
                loader.remove();
                iziToast.show({
                    timeout: 5000,
                    position: 'topCenter',
                    color: '#d11804',
                    messageColor: 'white',
                    titleColor: '#FFFFFF',
                    iconColor: '#FFFFFF',
                    message: "Sorry, there are no images matching your search query. Please try again!",
                });
            };
        } else {
            loader.remove();
            iziToast.show({
                timeout: 5000,
                position: 'topCenter',
                color: '#d11804',
                messageColor: 'white',
                titleColor: '#FFFFFF',
                iconColor: '#FFFFFF',
                message: "The field is empty. Please enter a word!",
            });
            refs.btnLoadMore.classList.add('hidden');
        };
    } catch (err) {
        iziToast.show({
            timeout: 5000,
            position: 'topCenter',
            color: '#d11804',
            messageColor: 'white',
            titleColor: '#FFFFFF',
            iconColor: '#FFFFFF',
            message: err.message,
            });
    };
    checkBtnStatus();
    refs.formEl.reset();
    refs.btnEl.disabled = true;
    refs.btnEl.classList.add('disabled');
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

function checkBtnStatus() { 
    const maxPage = Math.ceil(totalHits / PAGE_SIZE);
    const isLastPage = maxPage <= currentPage;
    if (isLastPage) {
        refs.btnLoadMore.classList.add('hidden');
    } else {
        refs.btnLoadMore.classList.remove('hidden');
    };
};


// async function onFormSubmit(e) {
//     e.preventDefault();
//     refs.formEl.insertAdjacentHTML("afterend", '<div class="loader-box "><span class="loader"></span></div>');

//     const loader = document.querySelector('.loader-box');

//     const galleryParentElem = document.querySelector('.gallery');
//     if (galleryParentElem) { galleryParentElem.remove(); };
    
//     const galleryParentElemMarkup = '<div class="gallery"></div>';
//     refs.galleryEl.insertAdjacentHTML("afterbegin", galleryParentElemMarkup);

//     const searchWord = e.target.elements.word.value.trim();

    // if (searchWord) { 
    //     const data = await searchImage();
    //     let imagesArray = data.hits;
    //     if (imagesArray.length > 0) {
    //         loader.remove();
    //         const markup = renderImages(imagesArray);
    //         addMarkup(markup);
    //                 // const gallery = refs.galleryEl.querySelector('.gallery');
    //                 // gallery.insertAdjacentHTML('beforeend', markup);
    //         simpleLightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 }).refresh();
    //     } else {
    //         loader.remove();
    //         iziToast.show({
    //             timeout: 5000,
    //             position: 'topCenter',
    //             color: '#d11804',
    //             messageColor: 'white',
    //             titleColor: '#FFFFFF',
    //             iconColor: '#FFFFFF',
    //             message: "Sorry, there are no images matching your search query. Please try again!",
    //         });
    //     };
    // } else {
    //     loader.remove();
    //     iziToast.show({
    //         timeout: 5000,
    //         position: 'topCenter',
    //         color: '#d11804',
    //         messageColor: 'white',
    //         titleColor: '#FFFFFF',
    //         iconColor: '#FFFFFF',
    //         message: "The field is empty. Please enter a word!",
    //     });
    // };

//     refs.formEl.reset();
//     refs.btnEl.disabled = true;
//     refs.btnEl.classList.add('disabled');

// };


// async function searchImage() {
//     const URL = 'https://pixabay.com';
//     const END_POINT = '/api/';
//     const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PAGE_SIZE}`;
    

//     const url = URL + END_POINT + PARAMS; 

//     const res = await axios.get(url);

//     return res.data;

// };


//     const url = URL + END_POINT + PARAMS; 

//     const res = await axios.get(url);

//     return res.data;


// export class ImagesApi {
//     constructor() {
//         this.BASE_URL = 'https://pixabay.com';
//         this.END_POINT = '/api/';
//     }
    
//     getImages(query) {
//         const PARAMS = {
//             key = '42153044-59e7d8487fc2c2f8c6f74878d',
//             q = query,
//             image_type = 'photo',
//             orientation = 'horizontal',
//             safesearch = true,
//             page = currentPage,
//             per_page = PAGE_SIZE

//         };
//         const url = `${this.BASE_URL}${this.END_POINT}`;

//         return axios.get(url, PARAMS);
//     }
// }


// let searchWord = '';
// let currentPage = 1;
// let totalHits = 0;
// const PAGE_SIZE = 15;
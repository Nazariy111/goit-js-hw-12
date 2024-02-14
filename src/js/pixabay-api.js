import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

let simpleLightBox;


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
    refs.galleryEl.insertAdjacentHTML("afterend", '<div class="loader-box "><span class="loader"></span></div>');
    const loader = document.querySelector('.loader-box');
    currentPage += 1;
    const oneGalleryElem = document.querySelector('.gallery-link');
    const elem = oneGalleryElem.getBoundingClientRect();
    console.log(elem.height);

    const data = await getImage();
    renderImages(data.hits);
    loader.remove();
    window.scrollBy(0, (elem.height * 2));
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
            checkBtnStatus();
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
                refs.btnLoadMore.classList.add('hidden');
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
        refs.btnLoadMore.classList.add('hidden');
    };
    
    refs.formEl.reset();
    refs.btnEl.disabled = true;
    refs.btnEl.classList.add('disabled');
};


async function getImage() {
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PAGE_SIZE}`;
    const url = `${BASE_URL}${END_POINT}${PARAMS}`;
    const res = await axios.get(url);
    return res.data;
};

function checkBtnStatus() { 
    const maxPage = Math.ceil(totalHits / PAGE_SIZE);
    const isLastPage = maxPage <= currentPage;
    if (isLastPage) {
        refs.btnLoadMore.classList.add('hidden');
        iziToast.show({
                    timeout: 5000,
                    position: 'topCenter',
                    color: '#d11804',
                    messageColor: 'white',
                    titleColor: '#FFFFFF',
                    iconColor: '#FFFFFF',
                    message: "We're sorry, but you've reached the end of search results.",
                });
    } else {
        refs.btnLoadMore.classList.remove('hidden');
    };
};

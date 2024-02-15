import { onFormSubmit } from "./js/pixabay-api";
import { onLoadMoreClick } from "./js/pixabay-api";

export const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery-box'),
    btnEl: document.querySelector('.search-btn'),
    btnLoadMore: document.querySelector('.load-btn'),
    
};


refs.formEl.addEventListener('submit', onFormSubmit);

refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

refs.formEl.addEventListener('input', e => {
    const searchWord = refs.formEl.elements.word.value.trim();
    if (searchWord) {
        refs.btnEl.disabled = false;
        refs.btnEl.classList.remove('disabled');
    };
});
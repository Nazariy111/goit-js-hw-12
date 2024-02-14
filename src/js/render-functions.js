
// import { refs } from "./pixabay-api";

// export function renderImages(imagesArray) {
//     const markup = imagesArray
//         .map(image => {
//             const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
//             return `<a class="gallery-link" href="${largeImageURL}">
//           <div class="gallery-item" id="${id}">
//             <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
//             <div class="info">
//               <p class="info-item"><b>Likes</b>${likes}</p>
//               <p class="info-item"><b>Views</b>${views}</p>
//               <p class="info-item"><b>Comments</b>${comments}</p>
//               <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//           </div>
//         </a>`;})
//         .join('');
    
//     return markup;
    
// };

// export function addMarkup(markup) {
//     const gallery = refs.galleryEl.querySelector('.gallery');
//     gallery.insertAdjacentHTML('beforeend', markup);
// };
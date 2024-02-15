import{S as m,i,a as b}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();function L({id:s,largeImageURL:o,webformatURL:l,tags:r,likes:e,views:a,comments:n,downloads:h}){return`<a class="gallery-link" href="${o}">
          <div class="gallery-item" id="${s}">
            <img class="gallery-image" src="${l}" alt="${r}" loading="lazy" data-source="${o}"/>
            <div class="info">
              <p class="info-item"><b>Likes</b>${e}</p>
              <p class="info-item"><b>Views</b>${a}</p>
              <p class="info-item"><b>Comments</b>${n}</p>
              <p class="info-item"><b>Downloads</b>${h}</p>
            </div>
          </div>
        </a>`}function u(s){const o=s.map(L).join("");t.galleryEl.querySelector(".gallery").insertAdjacentHTML("beforeend",o)}const f=15;let d="",c=1,g=0,y;async function E(){t.galleryEl.insertAdjacentHTML("afterend",'<div class="loader-box "><span class="loader"></span></div>');const s=document.querySelector(".loader-box");c+=1;const l=document.querySelector(".gallery-link").getBoundingClientRect(),r=await p();u(r.hits),s.remove(),window.scrollBy(0,l.height*2),y=new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),F()}async function v(s){s.preventDefault(),t.formEl.insertAdjacentHTML("afterend",'<div class="loader-box "><span class="loader"></span></div>');const o=document.querySelector(".gallery");o&&o.remove();const l=document.querySelector(".loader-box");d=s.target.elements.word.value.trim(),c=1;try{const r=await p();g=r.totalHits;const e='<div class="gallery"></div>';t.galleryEl.insertAdjacentHTML("afterbegin",e),d?r.hits.length>0?(l.remove(),u(r.hits),F(),y=new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()):(l.remove(),i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!"}),t.btnLoadMore.classList.add("hidden")):(l.remove(),i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"The field is empty. Please enter a word!"}),t.btnLoadMore.classList.add("hidden"))}catch(r){i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:r.message}),t.btnLoadMore.classList.add("hidden")}t.formEl.reset(),t.btnEl.disabled=!0,t.btnEl.classList.add("disabled")}async function p(){const s="https://pixabay.com",o="/api/",l=`?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${d}&image_type=photo&orientation=horizontal&safesearch=true&page=${c}&per_page=${f}`,r=`${s}${o}${l}`;return(await b.get(r)).data}function F(){Math.ceil(g/f)<=c?(t.btnLoadMore.classList.add("hidden"),i.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"We're sorry, but you've reached the end of search results."})):t.btnLoadMore.classList.remove("hidden")}const t={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".gallery-box"),btnEl:document.querySelector(".search-btn"),btnLoadMore:document.querySelector(".load-btn")};t.formEl.addEventListener("submit",v);t.btnLoadMore.addEventListener("click",E);t.formEl.addEventListener("input",s=>{t.formEl.elements.word.value.trim()&&(t.btnEl.disabled=!1,t.btnEl.classList.remove("disabled"))});
//# sourceMappingURL=commonHelpers.js.map
import{S as i,i as n,a as u}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();let c;document.querySelector(".loader-box");refs.formEl.addEventListener("submit",g);refs.btnLoadMore.addEventListener("click",m);refs.formEl.addEventListener("input",a=>{refs.formEl.elements.word.value.trim()&&(refs.btnEl.disabled=!1,refs.btnEl.classList.remove("disabled"))});async function m(){refs.galleryEl.insertAdjacentHTML("afterend",'<div class="loader-box "><span class="loader"></span></div>');const a=document.querySelector(".loader-box");currentPage+=1;const s=document.querySelector(".gallery-link").getBoundingClientRect();console.log(s.height);const t=await d();renderImages(t.hits),a.remove(),window.scrollBy(0,s.height*2),c=new i(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),f()}async function g(a){a.preventDefault(),refs.formEl.insertAdjacentHTML("afterend",'<div class="loader-box "><span class="loader"></span></div>');const r=document.querySelector(".gallery");r&&r.remove();const s=document.querySelector(".loader-box");query=a.target.elements.word.value.trim(),currentPage=1;try{const t=await d();totalHits=t.totalHits;const e='<div class="gallery"></div>';refs.galleryEl.insertAdjacentHTML("afterbegin",e),query?t.hits.length>0?(s.remove(),renderImages(t.hits),f(),c=new i(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()):(s.remove(),n.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!"}),refs.btnLoadMore.classList.add("hidden")):(s.remove(),n.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"The field is empty. Please enter a word!"}),refs.btnLoadMore.classList.add("hidden"))}catch(t){n.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:t.message}),refs.btnLoadMore.classList.add("hidden")}refs.formEl.reset(),refs.btnEl.disabled=!0,refs.btnEl.classList.add("disabled")}async function d(){const a="https://pixabay.com",r="/api/",s=`?key=42153044-59e7d8487fc2c2f8c6f74878d&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PAGE_SIZE}`,t=`${a}${r}${s}`;return(await u.get(t)).data}function f(){Math.ceil(totalHits/PAGE_SIZE)<=currentPage?(refs.btnLoadMore.classList.add("hidden"),n.show({timeout:5e3,position:"topCenter",color:"#d11804",messageColor:"white",titleColor:"#FFFFFF",iconColor:"#FFFFFF",message:"We're sorry, but you've reached the end of search results."})):refs.btnLoadMore.classList.remove("hidden")}
//# sourceMappingURL=commonHelpers.js.map
document.addEventListener('DOMContentLoaded',()=>{
 const collection=document.getElementById('collection'),toggle=document.getElementById('collection-toggle'),notes=document.getElementById('place-notes'),read=document.getElementById('read-place');
 const closeNotes=()=>{notes.hidden=true;read.setAttribute('aria-expanded','false');read.innerHTML='Read the place <span aria-hidden="true">↓</span>';};
 toggle.onclick=()=>{collection.hidden=!collection.hidden;toggle.setAttribute('aria-expanded',String(!collection.hidden));if(!collection.hidden)collection.querySelector('button').focus();};
 read.onclick=()=>{notes.hidden=!notes.hidden;read.setAttribute('aria-expanded',String(!notes.hidden));read.innerHTML=notes.hidden?'Read the place <span aria-hidden="true">↓</span>':'Close field notes <span aria-hidden="true">↑</span>';if(!notes.hidden){notes.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});notes.querySelector('h2').tabIndex=-1;notes.querySelector('h2').focus({preventScroll:true});}};
 document.getElementById('shuffleBtn').addEventListener('click',()=>{collection.hidden=true;toggle.setAttribute('aria-expanded','false');});
 heritageSites.forEach((site,i)=>{const b=document.createElement('button');b.type='button';b.dataset.place=i;b.textContent=String(i+1).padStart(2,'0')+'  '+site.name;b.onclick=()=>{collection.hidden=true;toggle.setAttribute('aria-expanded','false');renderSite(i);};document.getElementById('place-list').append(b);});
 new MutationObserver(closeNotes).observe(document.getElementById('siteName'),{childList:true});
 // Native tab semantics and keyboard movement.
 const tabs=[...document.querySelectorAll('[role=tab]')];tabs.forEach((tab,i)=>{tab.setAttribute('aria-controls','lensBody');tab.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:-1)+3)%3;tabs[j].click();tabs[j].focus();});});
 document.getElementById('siteImage').addEventListener('error',e=>{e.target.hidden=true;document.querySelector('.image-stack figcaption').textContent='Map unavailable. The place and its reference remain below.';});
});

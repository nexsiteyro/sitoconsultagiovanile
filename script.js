(()=>{"use strict";
const $=(s,p=document)=>p.querySelector(s),KEY="cg-consent-v1",MAX=180*864e5;
document.querySelectorAll(".yr").forEach(e=>e.textContent=new Date().getFullYear());
const b=$(".burger"),n=$("nav");
if(b)b.addEventListener("click",()=>{const o=n.classList.toggle("open");b.setAttribute("aria-expanded",o)});
/* Consenso cookie: solo scelte esplicite, memorizzate in localStorage (strumento tecnico) per 6 mesi */
const get=()=>{try{const c=JSON.parse(localStorage.getItem(KEY));return c&&Date.now()-c.t<MAX?c:null}catch(e){return null}};
const save=m=>{try{localStorage.setItem(KEY,JSON.stringify({t:Date.now(),maps:!!m}))}catch(e){}apply();hide()};
const bar=document.createElement("div");bar.id="cb";bar.hidden=true;
bar.setAttribute("role","dialog");bar.setAttribute("aria-label","Preferenze cookie");
bar.innerHTML=`<div class="wrap"><button class="x" type="button" aria-label="Chiudi e continua senza accettare">×</button>
<p><strong>Cookie e contenuti di terze parti.</strong> Questo sito usa solo strumenti tecnici necessari al funzionamento, che non richiedono consenso. Con il tuo consenso può caricare contenuti di terze parti (mappa OpenStreetMap), che possono installare cookie o raccogliere il tuo indirizzo IP. Puoi accettare, rifiutare o scegliere; la scelta si può cambiare in ogni momento da “Preferenze cookie” nel piè di pagina. Dettagli nella <a href="cookie-policy.html">Cookie policy</a>.</p>
<div class="acts"><button class="btn alt" data-a="no" type="button">Rifiuta tutti</button><button class="btn alt" data-a="cfg" type="button">Personalizza</button><button class="btn" data-a="yes" type="button">Accetta tutti</button></div>
<fieldset hidden><legend>Scegli le categorie</legend><label><input type="checkbox" checked disabled> Tecnici (sempre attivi, necessari al sito)</label>
<label><input type="checkbox" id="cb-maps"> Contenuti di terze parti: mappa OpenStreetMap</label><p><button class="btn" data-a="sv" type="button">Salva le scelte</button></p></fieldset></div>`;
document.body.appendChild(bar);
const hide=()=>{bar.hidden=true},show=()=>{const c=get();$("#cb-maps").checked=!!(c&&c.maps);bar.hidden=false;$("[data-a=no]",bar).focus()};
bar.addEventListener("click",e=>{const a=e.target.dataset.a;
if(e.target.classList.contains("x")||a==="no")save(false);
else if(a==="yes")save(true);
else if(a==="cfg"){const f=$("fieldset",bar);f.hidden=!f.hidden}
else if(a==="sv")save($("#cb-maps").checked)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!bar.hidden)save(false)});
document.querySelectorAll("[data-open-consent]").forEach(x=>x.addEventListener("click",show));
function apply(){const c=get();document.querySelectorAll("[data-embed]").forEach(el=>{
if(c&&c.maps){if(!el.querySelector("iframe")){const f=document.createElement("iframe");f.src=el.dataset.embed;f.title=el.dataset.title;f.loading="lazy";f.referrerPolicy="no-referrer";el.replaceChildren(f)}}
else if(!el.querySelector(".ask"))el.innerHTML=`<div class="ask"><p>${el.dataset.title}<br>Il contenuto è fornito da OpenStreetMap e viene caricato solo con il tuo consenso.</p><button class="btn" type="button">Consenti e carica la mappa</button> <a href="${el.dataset.link}" rel="noopener noreferrer" target="_blank">Apri su OpenStreetMap</a></div>`;
const k=el.querySelector(".ask button");if(k)k.onclick=()=>save(true)})}
apply();if(!get())show();
})();

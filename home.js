// Static review homepage: ordinary service actions open the actual public site.
const SITE='https://snack-ikitai.com';
const map=()=>location.assign('./map.html');
document.querySelector('[data-map-entry]').addEventListener('click',map);
document.querySelector('[aria-label="エリア・条件で探す"]').addEventListener('click',()=>location.assign(SITE+'/search'));
const locationButton=document.querySelector('[aria-label="現在地から探す"]');
locationButton.addEventListener('click',()=>{
  if(!navigator.geolocation)return map();
  locationButton.disabled=true;
  navigator.geolocation.getCurrentPosition(position=>{
    try{sessionStorage.setItem('snack-map-clusters-v1',JSON.stringify({center:[position.coords.longitude,position.coords.latitude],zoom:14,query:'',selectedId:null,fresh:false}));}catch{}
    map();
  },()=>map(),{enableHighAccuracy:false,timeout:8000,maximumAge:60000});
});
document.querySelectorAll('.home-login,.mobile-login-entry').forEach(e=>e.addEventListener('click',()=>location.assign(SITE+'/login')));
document.querySelectorAll('.home-register,.mobile-register-entry').forEach(e=>e.addEventListener('click',()=>location.assign(SITE+'/signup')));
document.querySelectorAll('[role="checkbox"]').forEach(e=>e.addEventListener('click',()=>location.assign(SITE+'/favorites')));
const trigger=document.querySelector('.menu-button');
const nav=document.createElement('nav');nav.className='mobile-menu';nav.id='shared-menu';nav.setAttribute('aria-label','モバイルナビゲーション');nav.hidden=true;
for(const [label,href] of [['トップページ','./'],['マップから探す','./map.html'],['お店を探す',SITE+'/search'],['注目のお店',SITE+'/discover?kind=featured'],['スナログ',SITE+'/stories'],['イキタイの使い方',SITE+'/guide/ikitai'],['スナ活の使い方',SITE+'/guide/sunakatsu'],['イキタイ',SITE+'/favorites'],['店舗オーナー様へ',SITE+'/info/owner'],['お問い合わせ',SITE+'/info/contact'],['ログイン',SITE+'/login'],['新規登録',SITE+'/signup']]){const a=document.createElement('a');a.textContent=label;a.href=href;nav.append(a);}
document.querySelector('.site-header').append(nav);
const style=document.createElement('style');style.textContent='.mobile-menu[hidden]{display:none!important}.mobile-menu{max-height:calc(100dvh - 76px);overflow:auto}';document.head.append(style);
function toggle(open){nav.hidden=!open;trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');}
trigger.setAttribute('aria-controls','shared-menu');trigger.addEventListener('click',()=>toggle(nav.hidden));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){toggle(false);trigger.focus();}});

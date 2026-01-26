let flipped=false;
const card=document.getElementById('card');
const btn=document.getElementById('btnMap');

function toggleCard(){
    flipped=!flipped;
    card.classList.toggle('flip');
    btn.textContent=flipped?'PRODUCTO EN PROMOCION':'VER MAPA DE TIENDA';
}

btn.onclick=toggleCard;
card.onclick=toggleCard;

/* ===== TOUCH SWIPE ===== */
let startX=0;
card.addEventListener('touchstart',e=>{
    startX=e.touches[0].clientX;
});

card.addEventListener('touchend',e=>{
    let endX=e.changedTouches[0].clientX;
    if(Math.abs(startX-endX)>50){
        toggleCard();
    }
});
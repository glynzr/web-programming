let element=document.getElementById('p').style.fontSize='10px'
document.getElementById('increase').addEventListener('click',increase)
document.getElementById('decrease').addEventListener('click',decrease)

let size=10
function increase(){
    size+=2;
    return document.getElementById('p').style.fontSize=`${size}px`;
}


function decrease(){
    size-=2;
    return document.getElementById('p').style.fontSize=`${size}px`;
}
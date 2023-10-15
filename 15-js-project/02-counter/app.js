const increaseButton=document.getElementById("increase");
const decreaseButton=document.getElementById("decrease");
const resetButton=document.getElementById("reset");

let counter=0;
document.getElementById("value").innerHTML=counter;

increaseButton.addEventListener('click',()=>{
    counter++;
    printCounter()
})

decreaseButton.addEventListener('click',()=>{
    counter--;
    printCounter()
})


resetButton.addEventListener('click',()=>{
    counter=0;
    printCounter()
})



function printCounter(){
    document.getElementById("value").innerHTML=counter;
    if(counter<0){
        document.getElementById("value").style.color="red";
    }else if(counter>0){
        document.getElementById("value").style.color="green";

    }else{
        document.getElementById("value").style.color="black";
    }
}
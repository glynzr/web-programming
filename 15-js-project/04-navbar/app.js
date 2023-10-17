// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navtoggle=document.querySelector(".nav-toggle");
const links=document.querySelector(".links");

//1st method for toggle
/*navtoggle.addEventListener('click',()=>{
    if(links.classList.contains('show-links')){
        links.classList.remove('show-links');
    }else{
        links.classList.add('show-links')
    }
})*/

//2nd method for toggle

navtoggle.addEventListener('click',()=>{
    links.classList.toggle('show-links')
})
const toggle= document.querySelector(".sidebar-toggle")
const close=document.querySelector(".close-btn")
const sidebar=document.querySelector('.sidebar')


toggle.addEventListener('click',()=>{
        sidebar.classList.toggle('show-sidebar')
})


close.addEventListener('click',()=>{
    sidebar.classList.remove('show-sidebar')
})
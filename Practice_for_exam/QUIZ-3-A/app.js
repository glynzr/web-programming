const express=require('express')
const app=express();

const router=require('./routers/router')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')



app.use(router)
app.listen(3000,()=>{
    console.log('Server is running... ')
})
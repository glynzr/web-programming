const express=require('express')
const app=express()
const router=require('./routers/router')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(express.static('public'))
app.set('view engine','ejs')




app.listen(3000,()=>{
    console.log('Server is running...')
})
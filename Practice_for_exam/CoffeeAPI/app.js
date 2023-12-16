const express=require('express')
const ejs=require('ejs')
const fs=require('fs')
const axios=require('axios')
const app=express()
const router=require('./routers/router.js')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(router)
app.set('view engine','ejs')


const fetchICE= async ()=>{
    try{
        const responseICED= await axios.get('https://api.sampleapis.com/coffee/iced')
        
        const dataICED=JSON.stringify(responseICED.data)
        fs.writeFile('iced.json',dataICED,(err)=>{
                if(err) console.log(err)
        })
    }catch(err){
        console.log('error');
    }
    
}
const fetchHOT= async()=>{
    try{
        const response=await axios.get('https://api.sampleapis.com/coffee/hot')
        const data=JSON.stringify(response.data)
        fs.writeFile('hot.json',data,(err)=>{
            if(err) console.log(err)
        })

    }catch(err){
        console.log(err);
    }
}

fetchHOT()
fetchICE()






app.listen(3000,()=>{
    console.log('Server is running...')
})



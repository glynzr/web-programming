const express=require('express');
const axios=require('axios');
const fs=require('fs');
const app=express();
const ejs=require('ejs')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

// const fetchData= async()=>{
//     try{const response= await axios.get('https://api.publicapis.org/entries')
//     const jsonData=JSON.stringify(response.data);
//     fs.promises.writeFile('data.json',jsonData,(err)=>{
//         if (err) console.log(err);
//     })} catch(err){
//         console.log(err);
//     }

// }
// fetchData();

const data=require('./data.json');
const selected=data.entries.slice(0,200);

app.get('/',(req,res)=>{
    res.render('index',{api:selected})
})

app.listen(3000,()=>{
    console.log('Server is running...')
})
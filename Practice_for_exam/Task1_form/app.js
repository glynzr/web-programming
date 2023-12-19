const express=require('express')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))


const products={
    "watch":120,
    "belt":15,
    "jacket":75,
    "coat":170

}
app.get('/',(req,res)=>{
    res.render('index',{result:""})
})

app.post('/',(req,res)=>{
    console.log(req.body)
    if(req.body.product && req.body.quantity){
        res.render('index',{result:`${products[req.body.product]*parseInt(req.body.quantity)}$`})
    }else{
        res.render('index',{result:"Wrong input"})
    }
})

app.listen(3000,()=>{
    console.log('Server is running...')
})
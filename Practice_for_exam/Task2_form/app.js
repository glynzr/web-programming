const express=require('express')
const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

// jacket ($220); coat ($145); boot ($85)
const products={
    'jacket':220,
    'coat':145,
    'boots':85
}

app.get('/',(req,res)=>{
    res.render('main',{result:''})
})

app.post('/',(req,res)=>{
    if(req.body.products!='product' && req.body.quantity){
        res.render('main',{result: `${products[req.body.products]*parseInt(req.body.quantity)}$`})
    }else{
        res.render('main',{result:'Wrong input'})
    }
})


app.listen(3000,()=>{
    console.log('Server is running...')
})
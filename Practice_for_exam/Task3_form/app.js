const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

const products={
    'watch':120,
    'belt':15,
    'jacket':75
}


app.get('/',(req,res)=>{
    res.render('main',{result:''})
})


app.post('/',(req,res)=>{
    console.log(req.body)
    let sum=0;
    let flag=0;
    if(req.body.watch && req.body.watch_quantity!=''){
        sum+=products.watch*parseInt(req.body.watch_quantity);
    }else if (!req.body.watch && req.body.watch_quantity===''){
        sum+=0;
    }else flag=1;

    if(req.body.belt && req.body.belt_quantity!=''){
        sum+=products.belt*parseInt(req.body.belt_quantity);
    }else if (!req.body.belt && req.body.belt_quantity===''){
        sum+=0;
    }else flag=1;

    if(req.body.jacket && req.body.jacket_quantity!=''){
        sum+=products.jacket*parseInt(req.body.jacket_quantity);
    }else if (!req.body.jacket && req.body.jacket_quantity===''){
        sum+=0;
    }else flag=1;

    if(flag){
        res.render('main',{result:'wrong input'})
    }else{
        res.render('main',{result:`${sum}$`})
    }
})
app.listen(3000,()=>{
    console.log('Server is running...')
})
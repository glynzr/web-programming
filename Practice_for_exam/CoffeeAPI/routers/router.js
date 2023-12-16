const {Router} =require('express');
const router=Router();

const iced=require('../iced.json')
const hot=require('../hot.json')

router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/',(req,res)=>{
    const coffeeType=req.body.coffeeType;
    console.log(coffeeType);
    if(coffeeType==='iced'){
        res.render('iced',{iced:iced})
    }else if (coffeeType==='hot'){
        res.render('hot',{hot:hot})
    }else{
        res.send('ERROR!!404 NOT FOUND')
    }
})


module.exports=router;
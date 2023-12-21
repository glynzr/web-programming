const {Router}=require('express');
const conn=require('../db');
const insert=require('./router')
const regions=Router()





conn.connect((err)=>{
    if(err) console.log(err)
})


regions.get('/regions',async (req,res)=>{
    let regions=(await conn.promise().query(`SELECT * FROM regions`))[0].map(region=>region.region_name)
    res.render('regions',{regions:regions,message:''})
})

regions.post('/regions',(req,res)=>{
    res.redirect('/')
})
regions.get('/regions/:name',async (req,res)=>{
    const name=req.params.name
    let sql=`SELECT * FROM administrative_divisions WHERE region=?`;
    const result=(await conn.promise().query(sql,[name]))[0]
    res.render('divisions',{region:name,divisions:result})
})

regions.post('/regions/:name',(req,res)=>{
    const name=req.params.name
    res.redirect('/regions')
})

module.exports=regions;
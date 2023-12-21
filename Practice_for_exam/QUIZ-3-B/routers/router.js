const {Router}=require('express')
const router=Router()
const insert=require('./insert')


router.use(insert)


module.exports=router
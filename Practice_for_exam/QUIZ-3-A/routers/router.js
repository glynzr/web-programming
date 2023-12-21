const {Router} =require('express');
const insert=require('./insert')
const regions=require('./regions');
const router=Router()

router.use(insert)
router.use(regions)


module.exports=router;

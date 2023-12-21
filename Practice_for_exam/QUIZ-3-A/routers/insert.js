const {Router}=require('express')
const insert=Router();
const {body,validationResult}=require('express-validator')
const conn=require('../db');
const regions=require('./router')


conn.connect((err)=>{
    if(err) {
        console.log(err)
    }
})

function getRegionName(item){
    return item.region_name;
}

insert.get('/',async (req,res)=>{
    let regions=(await conn.promise().query(`SELECT * FROM regions`))[0].map(getRegionName)
    res.render('index',{regions:regions,messages:[]});

})


insert.post('/',body('division_name').not().isEmpty().trim().withMessage('Division name should be filled')
                .isString().withMessage('Division name should be string'),
                body('azerbaijani_name').not().isEmpty().trim().withMessage('Azerbaijani name of division should be filled')
                .isString().withMessage('Azerbaijani name should be string'),
                body('capital').optional({nullable:true}).isString().trim(),
                body('area').not().isEmpty().withMessage('Area should be filled'),
                body('population').not().isEmpty().withMessage('Population should be filled'),
                body('notes').optional({nullable:true}).isString().trim(),
            async (req,res)=>{
                    
                    let errors=validationResult(req);
                    let regions=(await conn.promise().query(`SELECT * FROM regions`))[0].map(getRegionName)
                    if(!errors.isEmpty()){
                        errors=errors.array().map(e=>e.msg)
                        res.render('index',{messages:errors,regions:regions})
                    }else{
                        let values=[
                            req.body.division_name,
                            req.body.azerbaijani_name,
                            req.body.capital || null,
                            req.body.area,
                            req.body.population,
                            req.body.regions,
                            req.body.notes || null
                        ]

                        let sql=`INSERT INTO administrative_divisions(division_name,azerbaijani_name,capital,area,population,region,notes) VALUES(?,?,?,?,?,?,?)`
                        conn.promise().execute(sql,values).then(()=>{
                            res.render('regions',{regions:regions,message:'Division has been added successfully'})
                            console.log('Data inserted successfully')
                        }).catch(error=>{
                            console.log(error)
                        })
                    }
                    console.log(req.body)
                    
                    
})

module.exports=insert



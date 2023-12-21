const {Router}=require('express')
const insert=Router()
const {body,validationResult}=require('express-validator');
const conn=require('../db')

conn.connect(err=>{
    if(err) console.log(err);
})

var message=""

insert.get('/',(req,res)=>{
    res.render('insert',{messages:[]})
})

insert.post('/',body('division_name').not().isEmpty().withMessage('Division name should not be left empty').isString().trim(),
                body('azerbaijani_name').not().isEmpty().withMessage('Azerbaijani name of division should not be left empty')
                .isString().trim(),
                body('capital').optional({nullable:true}).isString().trim(),
                body('area').not().isEmpty().withMessage('Area should not be left empty'),
                body('population').not().isEmpty().withMessage('Population should not be left empty'),
                body('region').not().isEmpty().withMessage('Region should not be left empty'),
                body('notes').optional({nullable:true}),
                async (req,res)=>{
                    let errors=validationResult(req);
                    let regions=(await conn.promise().query(`SELECT * FROM regions`))[0].map(e=>e.region_name)
                    if(!errors.isEmpty()){
                        errors=errors.array().map(e=>e.msg)
                        res.render('insert',{messages:errors})
                    }else{
                        let values=[
                            req.body.division_name,
                            req.body.azerbaijani_name,
                            req.body.capital || null,
                            req.body.area,
                            req.body.population,
                            req.body.region,
                            req.body.notes || null
                        ]
                        
                        console.log(regions)
                        if(regions.indexOf(req.body.region)===-1){
                            res.render('insert',{messages:['Region does not exist ']})
                        }else{
                            console.log(values)
                            let inserNewRecord=`INSERT INTO administrative_divisions(division_name,azerbaijani_name,capital,area,population,region,notes) VALUES(?,?,?,?,?,?,?)`
                            conn.promise().execute(inserNewRecord,values)
                            .then(()=>{
                                res.redirect(`/${req.body.region}?success=true`);

                            }).catch((err)=>{
                                console.log('Error has happened:'+err)
                            })
                        }
                    }
})


insert.get('/:name',async (req,res)=>{
    const name=req.params.name;
    let details={}
    details.count=(await conn.promise().query(`SELECT COUNT(division_id) AS count FROM administrative_divisions WHERE region='${name}'`))[0][0].count
    details.divisions=(await conn.promise().query(`SELECT * FROM administrative_divisions WHERE region='${name}'`))[0]
    details.division_names=(await conn.promise().query(`SELECT division_name FROM administrative_divisions WHERE region='${name}'`))[0].map(e=>e.division_name).join(',')
    console.log(details.divisions)
    const successMessage = req.query.success === 'true' ? 'Success' : '';

    res.render('region', { details: details, name: name, message: successMessage });
});


insert.post('/:name',(req,res)=>{
    res.redirect('/')
})


module.exports=insert
const mysql=require('mysql2')
require('dotenv').config()
const conn=mysql.createConnection(
    {
        host:process.env.HOST,
        user:process.env.DB_USERNAME,
        database:process.env.DB_NAME
    }
)

module.exports=conn;
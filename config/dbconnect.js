const mongoose = require ('mongoose');

require('dotenv').config();

const dbstring = process.env.DBSTRING

const databaseconnect = async ()=>{
    try{
        console.log('database is connecting..');
        await mongoose.connect(dbstring, {})
        console.log('Database connected successfully')
    }catch(e){
          console.log('unable to connect due to', e.message)
        }
    }


module.exports = databaseconnect;
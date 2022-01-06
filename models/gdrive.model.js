const mongoose = require('mongoose')

const Gdrive = mongoose.model(
    "Gdrive",
    new mongoose.Schema({
        email:String,
        token:{
            access_token:String,
            refresh_token:String,
            scope:String,
            token_type:String,
            expiry_date:String
        }
    })
)

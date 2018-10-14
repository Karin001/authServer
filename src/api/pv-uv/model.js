const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const statIdSchema = new Schema({
    statId:{
        type:String,
        required:true,
    },
    browser:{
        type:String
    },
    browserLanguage:{
        type:String
    },
    platform:{
        type:String
    },
})
const dayPvUvSchema = new Schema({
    accessDate: {
        type: String,
        required:true
    },
    pv:{
        type: Number,
        required: true
    },
    uv:{
        type: Number,
        required: true
    },
    statIds:{
        type:[statIdSchema],
        required:true
    }
})
const PvUvSchema = new Schema({
    searchId:{
        type:String
    },
    name:{
        type:String,
        required: true
    },
    accessData:[dayPvUvSchema]
})

const PVUV = mongoose.model('PVUV', PvUvSchema);


module.exports = PVUV
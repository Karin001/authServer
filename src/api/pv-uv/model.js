const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const dayPvUvSchema = new Schema({
    accessDate: {
        type: String,
        required:true
    },
    brower:{
        type:String
    },
    browerLanguage:{
        type:String
    },
    platform:{
        type:String
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
        type:[String],
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
    accessData:[dayPvUv]
})

const PVUV = mongoose.model('PVUV', PvUvSchema);


module.exports = PVUV
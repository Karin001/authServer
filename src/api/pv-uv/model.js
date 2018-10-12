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
    getPlatform{
        type:String
    },
    pv:{
        type: Number,
        required: true
    },
    uv:{
        type: Number,
        required: true
    }
})
const PvUvSchema = new Schema({
    searchId:{
        type:String
    },
    name:{
        type:String
    },
    accessData:[dayPvUv]
})
const userDayAccessSchema = new Schema({
    accessDate:{
        type:String,
        required:true
    },
    accessCnt:{
        type:Number,
        required:true
    }
})
const UvStatIdSchema = new Schema({
    statId:{
        type:String,
        required:true
    },
   accessData:[userDayAccessSchema]
})
const PVUV = mongoose.model('PVUV', PvUvSchema);
const UV_STATID = mongoose.model('UV_STATID',UvStatIdSchema);

module.exports = {
    PVUV,UV_STATID
}
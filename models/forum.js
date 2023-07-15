const mongoose = require('mongoose')

const forumSchema =  new mongoose.Schema({
    founder:{type:mongoose.Schema.Types.ObjectId, ref:'User', require:true},
    title:{type:String, require:true},
    topic:{type:String,require:true},
    description:{type:String,require:true},
    members:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    numOfMembers:{type:Number},
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
})

const Forum = mongoose.model('Forum', forumSchema)

module.exports = Forum
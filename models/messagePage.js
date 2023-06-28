const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    
    userOne:{type:mongoose.Schema.Types.ObjectId, ref:'User', require:true},
    userTwo:{type:mongoose.Schema.Types.ObjectId, ref:'User', require:true},
    messages:{type:[mongoose.Schema.Types.ObjectId], ref:'Messages', require:true}
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page
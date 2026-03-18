const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    desc:{type:String,required:true},
    icon:{type:String,required:true},

})

const servicesModel = mongoose.model('services',servicesSchema)

module.exports = servicesModel
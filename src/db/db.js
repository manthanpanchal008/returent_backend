const mongoose = require('mongoose');


const dbconnect = async() => {

    try {
       await mongoose.connect(process.env.DB_CONNECT)
       console.log("database connected")
    } catch (error) {
        console.log("error=>",error)
    }
}
module.exports = dbconnect
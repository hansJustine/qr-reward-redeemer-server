const mongoose =require('mongoose')
const MONGODB_KEY = process.env.MONGODB_KEY 

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_KEY)
        console.log('MONGODB CONNECTED!!!!!!!!')
    } catch (err){
        console.log('MONGODB CONNECTION ERROR: ', err)
    }
}

module.exports = connectDB
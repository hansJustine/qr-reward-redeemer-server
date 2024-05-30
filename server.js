require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const Reward = require('./models/Reward')

const connectToMongoDB =  require('./utils/connectDB')
const errorHandler = require('./utils/errorHandler')
const ErrorResponse = require('./utils/ErrorResponse')
const cors = require('cors')
const connectDB = require('./utils/connectDB')


app.use(express.json())
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Earist\'s QR Code Verification API is running.')
})

app.post('/earist/api/rewards/getRewards', async (req, res, next) => {
    try {

        const rewards = await Reward.find({})
        res.status(201).json(rewards)
    } catch(err) {
        next(err)
    }
})

app.post('/earist/api/rewards/addReward', async (req, res, next) => {
    try {

        const newReward = await Reward.create({...req.body})
        res.status(201).json(newReward)

    } catch(err) {
        next(err)
    }
})

app.post('/earist/api/rewards/getRewardInfo', async (req, res, next) => {
    try {
        const {qrCode} = req.body
        if(!qrCode) return next(new ErrorResponse('Provide the QR\'s code', 400))
        
        const foundReward = await Reward.findOne({qrCode})

        res.status(200).json(foundReward)

    } catch(err) {
        next(err)
    }
})

app.post('/earist/api/rewards/setRewardRedeemed', async (req, res, next) => {
    try {
        const {qrCode} = req.body
        if(!qrCode) return next(new ErrorResponse('Provide the QR\'s code', 400))
        
        const updatedReward = await Reward.findOneAndUpdate({qrCode}, {isRedeemed: true}, {
            new: true
          });
        res.status(200).json(updatedReward)

    } catch(err) {
        next(err)
    }
})


app.use(errorHandler)



const PORT = process.env.PORT || 5000
connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))


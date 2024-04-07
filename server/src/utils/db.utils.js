import mongoose from 'mongoose'
import logger from '../logger/index.js'



export const connectDB = async() => {
    try {
        console.log(process.env.DB_URI)
        await mongoose.connect("mongodb://127.0.0.1:27017/pinterestlike" ,{})
        logger.warn('Connected to DB')
    } catch (error) {
        logger.error(error.message)
    }
}
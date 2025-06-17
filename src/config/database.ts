import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopline-app'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('成功連接到 MongoDB')
  } catch (error) {
    console.error('連接 MongoDB 時發生錯誤：', error)
    process.exit(1)
  }
} 
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import authRoutes from './routes/auth'
import webhookRoutes from './routes/webhook'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// 基本中間件
app.use(helmet())
app.use(cors())
app.use(express.json())

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100 // 限制每個 IP 100 個請求
})
app.use(limiter)

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/webhook', webhookRoutes)

// 健康檢查端點
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// 啟動伺服器
const startServer = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`伺服器運行在 http://localhost:${port}`)
    })
  } catch (error) {
    console.error('啟動伺服器時發生錯誤：', error)
    process.exit(1)
  }
}

startServer() 
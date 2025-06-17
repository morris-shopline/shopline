import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { shoplineRouter } from './routes/shopline'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// 中間件
app.use(helmet())
app.use(cors())
app.use(express.json())

// 路由
app.use('/api/shopline', shoplineRouter)

// 健康檢查端點
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`)
}) 
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())

// 首頁：顯示連接按鈕
app.get('/', (req: Request, res: Response) => {
  const shoplineAuthUrl = `https://open.shoplineapps.com/oauth/authorize?response_type=code&client_id=${process.env.SHOPLINE_API_KEY}&redirect_uri=${encodeURIComponent(process.env.CALLBACK_URL || '')}`
  res.send(`
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
      <h1>SHOPLINE OAuth 測試</h1>
      <a href="${shoplineAuthUrl}" style="padding:12px 24px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-size:18px;">連接 SHOPLINE</a>
    </div>
  `)
})

// 授權 callback，顯示成功訊息
app.get('/api/auth/callback', (req: Request, res: Response) => {
  const { code, shop } = req.query
  if (!code || !shop) {
    return res.status(400).send('缺少必要參數')
  }
  res.send(`
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
      <h1>授權成功！</h1>
      <p>Code: ${code}</p>
      <p>Shop: ${shop}</p>
    </div>
  `)
})

// 健康檢查
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`)
}) 
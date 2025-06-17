import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { shoplineRouter } from './routes/shopline'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// 中間件
app.use(
  helmet({
    frameguard: false,
    contentSecurityPolicy: false
  })
)
app.use(cors())
app.use(express.json())

// 根目錄 UI 或自動導向授權
app.get('/', (req, res) => {
  const { appkey, handle, timestamp, sign } = req.query
  if (appkey && handle && timestamp && sign) {
    // 自動導向 Shopline 授權頁
    const scope = 'read_products'
    const redirectUri = encodeURIComponent(process.env.SHOPLINE_REDIRECT_URI || '')
    const authorizeUrl = `https://${handle}.myshopline.com/admin/oauth-web/#/oauth/authorize?appKey=${process.env.SHOPLINE_API_KEY}&responseType=code&scope=${scope}&redirectUri=${redirectUri}`
    return res.redirect(authorizeUrl)
  }
  res.send(`
    <html>
      <head>
        <title>Shopline 測試 App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 class="text-2xl font-bold mb-4">Shopline 測試 App 已部署成功</h1>
          <p class="mb-2">Render 部署成功，伺服器運作中。</p>
          <p class="text-sm text-gray-500">可用路由：/health、/api/shopline/auth/callback、/api/shopline/webhook</p>
        </div>
      </body>
    </html>
  `)
})

// 路由
app.use('/api/shopline', shoplineRouter)

// 健康檢查端點
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`)
}) 
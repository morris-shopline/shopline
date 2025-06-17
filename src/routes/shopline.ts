import { Router } from 'express'
import fetch from 'node-fetch'

const router = Router()

// 處理 Shopline 的授權回調
router.get('/auth/callback', async (req, res) => {
  const { code, shop } = req.query
  
  if (!code || !shop) {
    return res.status(400).json({ error: '缺少必要參數' })
  }

  console.log('收到授權回調:', { code, shop })

  // 用 code 換 access token
  try {
    const tokenRes = await fetch('https://open.shopline.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.SHOPLINE_API_KEY,
        client_secret: process.env.SHOPLINE_API_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SHOPLINE_REDIRECT_URI
      })
    })
    const tokenData = await tokenRes.json()
    console.log('access token 回應:', tokenData)
    if (tokenData.access_token) {
      res.json({ message: '授權成功', access_token: tokenData.access_token, shop })
    } else {
      res.status(400).json({ error: '換取 access token 失敗', detail: tokenData })
    }
  } catch (err) {
    console.error('換取 access token 發生錯誤:', err)
    res.status(500).json({ error: '伺服器錯誤', detail: String(err) })
  }
})

// 處理 Webhook
router.post('/webhook', (req, res) => {
  const webhookData = req.body
  console.log('收到 Webhook 資料:', webhookData)
  
  res.json({ message: 'Webhook 接收成功' })
})

export const shoplineRouter = router 
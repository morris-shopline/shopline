import { Router } from 'express'

const router = Router()

// 處理 Shopline 的授權回調
router.get('/auth/callback', (req, res) => {
  const { code, shop } = req.query
  
  if (!code || !shop) {
    return res.status(400).json({ error: '缺少必要參數' })
  }

  console.log('收到授權回調:', { code, shop })
  
  // TODO: 處理授權邏輯
  res.json({ message: '授權成功', shop })
})

// 處理 Webhook
router.post('/webhook', (req, res) => {
  const webhookData = req.body
  console.log('收到 Webhook 資料:', webhookData)
  
  res.json({ message: 'Webhook 接收成功' })
})

export const shoplineRouter = router 
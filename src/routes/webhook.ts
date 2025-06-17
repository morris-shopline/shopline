import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

// 處理 SHOPLINE Webhook
router.post('/', async (req: Request, res: Response) => {
  try {
    const webhookData = req.body
    console.log('收到 Webhook 資料：', webhookData)

    // TODO: 實作 Webhook 處理邏輯

    res.status(200).json({ message: 'Webhook 處理成功' })
  } catch (error) {
    console.error('處理 Webhook 時發生錯誤：', error)
    res.status(500).json({ error: '處理 Webhook 時發生錯誤' })
  }
})

export default router 
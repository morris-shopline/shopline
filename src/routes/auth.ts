import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

// 處理 SHOPLINE 授權回調
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const { code, shop } = req.query

    if (!code || !shop) {
      return res.status(400).json({ error: '缺少必要的參數' })
    }

    // TODO: 實作 SHOPLINE OAuth 流程
    console.log('收到授權回調：', { code, shop })

    res.status(200).json({ message: '授權成功' })
  } catch (error) {
    console.error('處理授權回調時發生錯誤：', error)
    res.status(500).json({ error: '處理授權時發生錯誤' })
  }
})

export default router 
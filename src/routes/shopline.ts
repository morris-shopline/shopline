import { Router, Request, Response } from 'express'
import fetch from 'node-fetch'
import crypto from 'crypto'

const router = Router()

// 驗證簽名
function verifySignature(params: Record<string, string>, appSecret: string): boolean {
  const { sign, ...rest } = params
  const sortedParams = Object.keys(rest)
    .sort()
    .reduce((acc, key) => {
      acc[key] = rest[key]
      return acc
    }, {} as Record<string, string>)

  const stringToSign = Object.entries(sortedParams)
    .map(([key, value]) => `${key}${value}`)
    .join('')

  const calculatedSign = crypto
    .createHmac('sha256', appSecret)
    .update(stringToSign)
    .digest('hex')

  return calculatedSign === sign
}

// Step 1: 驗證應用安裝請求
router.get('/', (req: Request, res: Response) => {
  const { appkey, handle, lang, timestamp, sign } = req.query as Record<string, string>
  
  // 驗證必要參數
  if (!appkey || !handle || !timestamp || !sign) {
    return res.status(400).json({ 
      code: 400,
      i18nCode: 'INVALID_PARAMETERS',
      message: 'Missing required parameters'
    })
  }

  // 驗證簽名
  const isValid = verifySignature(
    { appkey, handle, lang, timestamp },
    process.env.SHOPLINE_API_SECRET || ''
  )

  if (!isValid) {
    return res.status(401).json({
      code: 401,
      i18nCode: 'INVALID_SIGNATURE',
      message: 'Invalid signature'
    })
  }

  // 生成授權 URL
  const authUrl = `https://${handle}.myshopline.com/admin/oauth-web/#/oauth/authorize?` + 
    `appKey=${process.env.SHOPLINE_API_KEY}&` +
    `responseType=code&` +
    `scope=read_products,write_products&` + // 根據需求設置所需權限
    `redirectUri=${encodeURIComponent(process.env.SHOPLINE_REDIRECT_URI || '')}`

  // 重定向到授權頁面
  res.redirect(authUrl)
})

// Step 3: 接收授權碼
router.get('/auth/callback', async (req: Request, res: Response) => {
  const { code, handle } = req.query as Record<string, string>
  
  if (!code || !handle) {
    return res.status(400).json({
      code: 400,
      i18nCode: 'INVALID_PARAMETERS',
      message: 'Missing code or handle'
    })
  }

  // Step 4: 請求訪問令牌
  try {
    const timestamp = Date.now()
    const params = {
      code: code,
      grantType: 'authorization_code',
      appKey: process.env.SHOPLINE_API_KEY || '',
      timestamp: timestamp.toString()
    }

    // 生成簽名
    const sign = crypto
      .createHmac('sha256', process.env.SHOPLINE_API_SECRET || '')
      .update(Object.entries(params)
        .sort()
        .map(([key, value]) => `${key}${value}`)
        .join(''))
      .digest('hex')

    const tokenRes = await fetch('https://open.shopline.com/token/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'appkey': process.env.SHOPLINE_API_KEY || '',
        'timestamp': timestamp.toString(),
        'sign': sign
      },
      body: JSON.stringify(params)
    })

    const tokenData = await tokenRes.json()
    
    if (tokenData.code === 200) {
      // 儲存 token 資訊
      // TODO: 實作 token 儲存邏輯
      res.json({
        code: 200,
        i18nCode: 'SUCCESS',
        message: 'Authorization successful',
        data: tokenData.data
      })
    } else {
      res.status(400).json(tokenData)
    }
  } catch (err) {
    console.error('Error exchanging token:', err)
    res.status(500).json({
      code: 500,
      i18nCode: 'SERVER_ERROR',
      message: String(err)
    })
  }
})

// 處理 Webhook
router.post('/webhook', (req: Request, res: Response) => {
  // TODO: 實作 Webhook 簽名驗證
  const webhookData = req.body
  console.log('Received webhook data:', webhookData)
  
  res.json({
    code: 200,
    i18nCode: 'SUCCESS',
    message: 'Webhook received'
  })
})

export const shoplineRouter = router 
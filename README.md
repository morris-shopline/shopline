# SHOPLINE Customized App

這是一個用於測試 SHOPLINE API 和 Webhook 的 Customized App。

## 功能特點

- SHOPLINE OAuth 授權流程
- Webhook 接收與處理
- RESTful API 整合
- 前後端合一架構

## 技術堆疊

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## 快速開始

1. 安裝依賴：
```bash
npm install
```

2. 設定環境變數：
```bash
cp .env.example .env
```
然後編輯 `.env` 檔案，填入必要的設定值。

3. 開發模式運行：
```bash
npm run dev
```

4. 生產環境運行：
```bash
npm run build
npm start
```

## API 端點

- `GET /api/auth/callback` - SHOPLINE 授權回調
- `POST /api/webhook` - Webhook 接收端點
- `GET /health` - 健康檢查

## 部署

本專案設計為可部署在 Render 平台上。部署時請確保：

1. 設定正確的環境變數
2. 設定正確的 Build Command：`npm run build`
3. 設定正確的 Start Command：`npm start`

## 開發指南

詳細的開發指南和實作筆記請參考 `PROCESSING_STATUS.md`。

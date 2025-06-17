# Shopline API 測試應用程式

這是一個用於測試 Shopline API 和 Webhook 的應用程式。

## 快速開始

1. 安裝依賴：
```bash
npm install
```

2. 複製環境變數文件：
```bash
cp .env.example .env
```

3. 修改 `.env` 文件中的配置

4. 啟動開發伺服器：
```bash
npm run dev
```

## 主要功能

- Shopline 授權回調處理
- Webhook 接收
- API 測試

## 部署

本應用程式可以部署到 Render 平台。請確保設置以下環境變數：

- `PORT`
- `MONGODB_URI`
- `SHOPLINE_API_KEY`
- `SHOPLINE_API_SECRET`
- `SHOPLINE_REDIRECT_URI` 
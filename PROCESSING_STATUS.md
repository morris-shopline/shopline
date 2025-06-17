# 開發狀態與實作筆記

## 專案狀態

- [x] 基本專案結構設定
- [x] 環境變數配置
- [x] 資料庫連線設定
- [ ] SHOPLINE OAuth 流程實作
- [ ] Webhook 處理邏輯
- [ ] API 整合測試
- [ ] 部署配置

## 實作筆記

### SHOPLINE OAuth 流程

1. 商家安裝 App 時，會重定向到 SHOPLINE 的授權頁面
2. 商家授權後，SHOPLINE 會回調到我們的 callback URL
3. 我們需要：
   - 驗證回調請求
   - 使用授權碼獲取 access token
   - 儲存商店資訊和 access token

### Webhook 處理

1. 需要實作的 Webhook 事件：
   - 商品建立/更新/刪除
   - 訂單建立/更新
   - 客戶建立/更新

2. 安全性考慮：
   - 驗證 Webhook 簽名
   - 處理重複事件
   - 錯誤處理和重試機制

### API 整合

1. 需要實作的 API 端點：
   - 商品管理
   - 訂單管理
   - 客戶管理

2. 注意事項：
   - API 版本控制
   - 請求限制處理
   - 錯誤處理

## 待辦事項

- [ ] 實作 SHOPLINE OAuth 流程
- [ ] 建立 Webhook 處理邏輯
- [ ] 實作 API 整合
- [ ] 設定自動化測試
- [ ] 準備部署文件 
# API設計書

## 1．ログイン
- **URL**: `GET http://サーバ名/auth?user_id=1&password=xxx`
- **Responce**　`{ user_id: 1, token: xxx-xxx-xxxx }`

## 2. ポスト投稿
- **URL** `POST http://サーバ名/post?token=xxx-xxx-xxxx`
- **Body** `{ "message":  投稿内容（文字列）}`
- **Responce**

## 3. ポスト取得一覧
- **URL** `POST  http://サーバ名/post?token=xxx-xxx-xxxx`
- **Responce** `[ { "id": 3, "user_name": "example", "content": "xxx", "created_at": "2024-10-30 12:34:56" } ]`

## 4. ユーザー情報取得
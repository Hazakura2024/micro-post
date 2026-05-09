# API設計書

## 1. 前提

- Base URL: `http://localhost:3000`
- 認証方式
  - access token: `Authorization: Bearer <token>`
  - refresh token: Cookie (`refresh_token`)
- CORS
  - `credentials: true`
  - Origin: `http://localhost:3001`, `http://127.0.0.1:3001`
- 日時形式
  - `created_at` は ISO 8601 文字列

## 2. 認証

### 2-1. ログイン

- Method/Path: `POST /auth`
- Body (JSON)
  - `user_id` (string, 必須): 実装上はユーザー名
  - `password` (string, 必須)

#### レスポンス（200）

```json
{
  "user_id": 1,
  "token": "<access_token>"
}
```

補足

- refresh token は `Set-Cookie` で返却

### 2-2. トークン再発行

- Method/Path: `POST /auth/refresh`
- Body: なし
- Cookie: `refresh_token` が必要

#### レスポンス（200）

```json
{
  "userid": 1,
  "token": "<new_access_token>"
}
```

### 2-3. ログアウト

- Method/Path: `DELETE /auth/logout`
- 認証: Bearer 必須
- レスポンス: `200`（ボディなし）

## 3. ユーザー

### 3-1. ユーザー作成

- Method/Path: `POST /user/create`
- Body (JSON)
  - `name` (string, 必須)
  - `email` (string, 必須, email形式)
  - `password` (string, 必須, 最小6文字)

#### レスポンス（201相当）

```json
{
  "id": 1,
  "name": "taro",
  "email": "taro@example.com",
  "createdAt": "2026-04-20T12:34:56.000Z"
}
```

### 3-2. 自分情報取得

- Method/Path: `GET /user/me`
- 認証: Bearer 必須

#### レスポンス（200）

```json
{
  "id": 1,
  "name": "taro",
  "email": "taro@example.com",
  "icon_path": "/uploads/users/1/icon.png",
  "createdAt": "2026-04-20T12:34:56.000Z"
}
```

### 3-3. ユーザー名更新

- Method/Path: `PATCH /user/me`
- 認証: Bearer 必須
- Body (JSON)
  - `name` (string, 必須, 最大50文字)

### 3-4. アイコン更新

- Method/Path: `PATCH /user/me/icon`
- 認証: Bearer 必須
- Content-Type: `multipart/form-data`
- Form field
  - `icon` (file, 必須)

#### レスポンス（200）

```json
{
  "id": 1,
  "name": "taro",
  "icon_path": "/uploads/users/1/<filename>.png"
}
```

### 3-5. アイコン取得

- Method/Path: `GET /user/me/icon`
- 認証: Bearer 必須

#### レスポンス（200）

```json
"/uploads/users/1/<filename>.png"
```

## 4. 投稿

### 4-1. 投稿作成

- Method/Path: `POST /post`
- 認証: Bearer 必須
- Body (JSON)
  - `message` (string, 必須, 最大140文字)

#### レスポンス（201相当）

```json
{
  "id": 10,
  "success": true
}
```

### 4-2. 投稿一覧取得

- Method/Path: `GET /post`
- 認証: Bearer 必須
- Query
  - `start` (number, 任意, default: `0`)
  - `records` (number, 任意, default: `1`)
  - `word` (string, 任意): 投稿本文検索
  - `user_name` (string, 任意): 投稿者名検索

#### レスポンス（200）

```json
[
  {
    "id": 3,
    "user_id": 1,
    "user_name": "taro",
    "user_icon": "/uploads/users/1/icon.png",
    "content": "投稿内容",
    "created_at": "2026-04-20T12:34:56.000Z"
  }
]
```

### 4-3. 投稿削除

- Method/Path: `DELETE /post/:id`
- 認証: Bearer 必須
- Path Parameter
  - `id` (number, 必須)

#### レスポンス

- `200`（ボディなし）

## 5. エラー概要

- `400 Bad Request`: バリデーションエラー
- `401 Unauthorized`: 認証失敗、トークン不正、refresh失敗
- `403 Forbidden`: 権限不足（自分以外の投稿削除など）
- `404 Not Found`: 対象データなし
- `409 Conflict`: 重複（ユーザー名/メール）

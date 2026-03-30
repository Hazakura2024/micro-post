# API設計書

## 1. 前提

- Base URL: `http://localhost:3000`
- 認証方式: `auth` テーブルで発行したトークンをクエリ文字列で送信
- 日時形式: `created_at` はISO 8601文字列（例: `2026-03-23T12:34:56.000Z`）

## 2. ログイン

- Method/Path: `GET /auth`
- Query
  - `user_id` (string, 必須): 実装上は「ユーザー名」を渡す
  - `password` (string, 必須)

### リクエスト例

`GET /auth?user_id=taro&password=secret123`

### レスポンス（200）

```json
{
  "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "user_id": 1
}
```

### エラー

- `401 Unauthorized`: パスワード未指定、または認証失敗

## 3. ユーザー作成

- Method/Path: `POST /user`
- Body (JSON)
  - `name` (string, 必須)
  - `email` (string, 必須, email形式)
  - `password` (string, 必須, 最小6文字)

### リクエスト例

```json
{
  "name": "taro",
  "email": "taro@example.com",
  "password": "secret123"
}
```

### レスポンス（201相当）

```json
{
  "id": 1,
  "name": "taro",
  "email": "taro@example.com",
  "createdAt": "2026-03-23T12:34:56.000Z"
}
```

### エラー

- `400 Bad Request`: バリデーションエラー
- `409 Conflict`: メールアドレス重複、またはユーザー名重複

## 4. ユーザー情報取得

- Method/Path: `GET /user/:id`
- Path Parameter
  - `id` (number, 必須)
- Query
  - `token` (string, 必須)

### リクエスト例

`GET /user/1?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### レスポンス（200）

```json
{
  "id": 1,
  "name": "taro",
  "email": "taro@example.com",
  "createdAt": "2026-03-23T12:34:56.000Z"
}
```

### エラー

- `403 Forbidden`: トークン不正、または期限切れ
- `404 Not Found`: 対象ユーザーが存在しない

## 5. ポスト投稿

- Method/Path: `POST /post`
- Query
  - `token` (string, 必須)
- Body (JSON)
  - `message` (string, 必須, 1〜140文字)

### リクエスト例

`POST /post?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

```json
{
  "message": "こんにちは"
}
```

### レスポンス（201相当）

```json
{
  "id": 10,
  "success": true
}
```

### エラー

- `400 Bad Request`: `message` または `token` のバリデーションエラー
- `403 Forbidden`: トークン不正、または期限切れ

## 6. ポスト一覧取得

- Method/Path: `GET /post`
- Query
  - `token` (string, 必須)
  - `start` (number, 任意, default: `0`)
  - `records` (number, 任意, default: `1`)

### リクエスト例

`GET /post?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&start=0&records=10`

### レスポンス（200）

```json
[
  {
    "id": 3,
    "user_id": 1,
    "user_name": "taro",
    "content": "投稿内容",
    "created_at": "2026-03-23T12:34:56.000Z"
  }
]
```

### エラー

- `403 Forbidden`: トークン不正、または期限切れ

## 7. ポスト削除

- Method/Path: `DELETE /post/:post_id`
- Path Parameter
  - `post_id` (number, 必須)
- Query
  - `token` (string, 必須)

### リクエスト例

`DELETE /post/1?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### レスポンス（204 No Content）

- Body: なし

### エラー

- `400 Bad Request`: id 不正
- `403 Forbidden`: トークン不正、または期限切れ

## 8. アイコン登録

- Method/Path: `PATCH /user/me/icon`
- Path Parameter
  - `token` (string, 必須)

### リクエスト例

`PATCH /user/me/icon?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### レスポンス（204 No Content）

- Body: なし

### エラー

- `403 Forbidden`: トークン不正、または期限切れ

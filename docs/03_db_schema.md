# DB設計書

## 1. テーブル一覧

### user

| カラム名   | 型        | NULL     | 備考               |
| :--------- | :-------- | :------- | :----------------- |
| id         | serial    | NOT NULL | Primary Key        |
| name       | varchar   | NOT NULL | ユーザー名         |
| hash       | varchar   | NOT NULL | パスワードハッシュ |
| email      | varchar   | NOT NULL | メールアドレス     |
| created_at | timestamp | NOT NULL | DEFAULT `now()`    |
| updated_at | timestamp | NOT NULL | DEFAULT `now()`    |

### micro_post

| カラム名   | 型        | NULL     | 備考             |
| :--------- | :-------- | :------- | :--------------- |
| id         | serial    | NOT NULL | Primary Key      |
| user_id    | integer   | NOT NULL | 投稿者ユーザーID |
| content    | varchar   | NOT NULL | 投稿本文         |
| created_at | timestamp | NOT NULL | DEFAULT `now()`  |
| updated_at | timestamp | NOT NULL | DEFAULT `now()`  |

### auth

| カラム名   | 型        | NULL     | 備考            |
| :--------- | :-------- | :------- | :-------------- |
| id         | serial    | NOT NULL | Primary Key     |
| user_id    | integer   | NOT NULL | 対象ユーザーID  |
| token      | varchar   | NOT NULL | 認証トークン    |
| expire_at  | timestamp | NOT NULL | 有効期限        |
| created_at | timestamp | NOT NULL | DEFAULT `now()` |
| updated_at | timestamp | NOT NULL | DEFAULT `now()` |

## 2. 制約・リレーション

- 現行マイグレーションでは、`micro_post.user_id` と `auth.user_id` に外部キー制約は未定義。
- 一意制約（UNIQUE）やインデックス（INDEX）は未定義。

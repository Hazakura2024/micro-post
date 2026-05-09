# MicroPost

MicroPost は、ユーザー認証付きで短文投稿・検索・ページング・削除ができる Web アプリです。

## 構成

- frontend
  - React + TypeScript + Vite
  - react-router-dom
  - TanStack Query
  - Zustand
  - axios (interceptor で認証ヘッダー制御)
- backend
  - NestJS
  - Passport JWT
  - TypeORM
  - cookie-parser
- database
  - PostgreSQL (docker-compose)

## 認証の仕組み

- access token
  - Authorization: Bearer で送信
- refresh token
  - httpOnly Cookie で管理
- クライアント側
  - request interceptor で access token を自動付与
  - response interceptor で 401 時に /auth/refresh を実行
  - 同時 401 は refreshPromise で 1 本化

## リポジトリ構成

```text
micro-post/
	backend/
	frontend/
	docs/
```

## 前提

- Node.js 20+
- npm
- Docker / Docker Compose

## セットアップ

### 1. 環境変数を作成

backend 配下に .env を作成してください。

```env
# DB
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=micropost

# JWT
ACCESS_SECRET_KEY=replace_me_access
REFRESH_SECRET_KEY=replace_me_refresh

# CORS
FRONTEND_URL=http://localhost:3001

# Backend
PORT=3000

# pgAdmin (docker-compose で利用)
PGAGMIN_EMAIL=admin@example.com
PGAGMIN_PASSWORD=admin
```

### 2. 依存関係インストール

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. DB 起動

```bash
cd backend
docker compose up -d
```

### 4. マイグレーション実行

```bash
cd backend
npm run typeorm migration:run -- -d src/app.datasource.ts
```

### 5. アプリ起動

backend:

```bash
cd backend
npm run start:dev
```

frontend:

```bash
cd frontend
npm run dev
```

## 主要 URL

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- pgAdmin: http://localhost:5050

## 主なスクリプト

backend:

- npm run start:dev
- npm run build
- npm run test
- npm run lint

frontend:

- npm run dev
- npm run build
- npm run lint

## ドキュメント

- docs/01_requirements.md
- docs/02_architecture.md
- docs/03_db_schema.md
- docs/04_api_spec.md
- docs/05_ui_design.md

## 補足

- 投稿一覧は TanStack Query で取得・キャッシュ管理
- 検索条件とページ番号は URL クエリを正本として管理
- 認証状態は Zustand の useAuthStore で管理

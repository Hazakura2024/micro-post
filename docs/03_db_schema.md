# DB設計書

## 1. テーブル一覧
### userstable
|カラム名|型|備考|
|:---|:---|:---|
|id|number|Primary key|
|name|varchar||
|hash|varchar|パスワードのハッシュ|
|email|varchar||
|created_at|varchar||
|updated_at|varchar||

### micro_posttable
|カラム名|型|備考|
|:---|:---|:---|
|id|number|Primary key|
|user_id|number||
|content|varchar||
|created_at|timestamp||
|updated_at|timestamp||

### authtable
|カラム名|型|備考|
|:---|:---|:---|
|id|number|Primary key|
|user_id|number||
|token|varchar||
|expire_at|timestamp|有効期限|
|created_at|timestamp||
|updated_at|timestamp||
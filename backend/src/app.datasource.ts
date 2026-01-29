import { DataSource } from 'typeorm';

require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  // 資料にはないが追加
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // 資料にはないが追加。
  // NOTE: synchronize: trueはアプリ起動時に、TypeORMがエンティティ（コード）を見て、勝手にDBの形を書き換えます。マイグレーション履歴を無視して変更を加えます。
  synchronize: false,
  // 資料にはないが追加
  // NOTE: 実際にどんなSQLが発行されたか見える
  logging: true,
  entities: ['src/entities/*.ts"'],
  migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;

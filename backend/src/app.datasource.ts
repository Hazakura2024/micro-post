import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// NOTE:  資料ではrequireを使っていたがESlintに怒られるのでimportに変更
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  // NOTE:  資料にはないが追加
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // NOTE:  資料にはないが追加。
  // (学習メモ): synchronize: trueはアプリ起動時に、TypeORMがエンティティ（コード）を見て、勝手にDBの形を書き換えます。マイグレーション履歴を無視して変更を加えます。
  synchronize: false,
  // NOTE: 資料にはないが追加
  // (学習メモ): 実際にどんなSQLが発行されたか見える
  logging: true,
  // (学習メモ): 現在実行中のファイルが存在するディレクトリの絶対パス+{コンパイル}
  entities: [__dirname + '/entities/*.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});

export default AppDataSource;

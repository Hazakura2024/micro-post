import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { MicroPost } from 'src/entities/micropost';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MicroPost)
    private microPostRepository: Repository<MicroPost>,
    @InjectRepository(Auth)
    private AuthRepository: Repository<Auth>,
  ) {}

  async createPost(message: string, token: string) {
    // ログイン済みかチェック
    const now = new Date();
    const auth = await this.AuthRepository.findOne({
      where: {
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    // レコードを作成
    const record = {
      user_id: auth.user_id,
      content: message,
    };
    await this.microPostRepository.save(record);
  }

  async getList(token: string, start: number = 0, nr_records: number = 1) {
    //ログイン済かチェック
    const now = new Date();
    const auth = await this.AuthRepository.findOne({
      where: {
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    const qb = this.microPostRepository
      // 1. クエリビルダーの開始
      // SQL: SELECT * FROM micro_post AS micro_post
      .createQueryBuilder('micro_post')

      // 2. テーブルの結合
      // SQL: LEFT JOIN user ON user.id = micro_post.user_id
      // 意味: micro_postテーブルに、userテーブルをくっつけます。
      // 第2引数の 'user' はこのクエリ内で使うあだ名（エイリアス）です。
      .leftJoinAndSelect('user', 'user', 'user.id=micro_post.user_id')

      // 3. 取得する列の指定（と名前の付け替え）
      // SQL: SELECT micro_post.id AS id, user.name AS user_name, ...
      // 意味: 全部の列はいらないので、必要な列だけ選んで、使いやすい名前に変えます。
      .select([
        'micro_post.id as id',
        'user.name as user_name',
        'micro_post.content as content',
        'micro_post.created_at as created_at',
      ])
      // SQL: ORDER BY micro_post.created_at DESC
      .orderBy('micro_post.created_At', 'DESC')

      // オフセット（ページネーション用）
      // SQL: OFFSET 10 (例)
      // 意味: 先頭から start 件分をスキップします
      .offset(start)

      // リミット（ページネーション用）
      // SQL: LIMIT 5 (例)
      .limit(nr_records);

    type ResultType = {
      id: number;
      content: string;
      user_name: string;
      created_at: Date;
    };
    const records = await qb.getRawMany<ResultType>();
    console.log(records);

    return records;
  }
}

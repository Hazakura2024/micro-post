import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUser } from 'src/auth/types/jwt-user.type';
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
  ) { }

  async createPost(message: string, user: JwtUser) {
    // NOTE: レコードを作成
    const record = {
      user_id: user.sub,
      content: message,
    };
    const savedPost = await this.microPostRepository.save(record);

    return {
      id: savedPost.id,
      success: true,
    };
  }

  async deletePost(id: number, user: JwtUser) {

    // 対象ポストを取得
    const post = await this.microPostRepository.findOne({
      where: { id: Equal(id) },
    });
    if (!post) {
      throw new NotFoundException('投稿が見つかりません');
    }

    if (user.sub !== post.user_id) {
      throw new ForbiddenException('自分以外の投稿は削除できません');
    }

    // 対象レコードを削除
    await this.microPostRepository.delete(id);
  }

  async getList(
    start: number = 0,
    nr_records: number = 1,
    word?: string,
    user_name?: string,
  ) {
    let qb = this.microPostRepository
      // (学習メモ): 以下、学習用メモ
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
        'micro_post.user_id as user_id',
        'user.name as user_name',
        'user.icon_path as user_icon',
        'micro_post.content as content',
        'micro_post.created_at as created_at',
      ])
      // SQL: ORDER BY micro_post.created_at DESC
      .orderBy('micro_post.created_at', 'DESC')

      // オフセット（ページネーション用）
      // SQL: OFFSET 10 (例)
      // 意味: 先頭から start 件分をスキップします
      .offset(start)

      // リミット（ページネーション用）
      // SQL: LIMIT 5 (例)
      .limit(nr_records)

      // (学習メモ): 以降はandWhereで統一できるように、先にダミーのwhereを置いておく
      .where('1 = 1');

    // NOTE: 検索機能

    // (学習メモ): ILIKEは大文字小文字関係なく検索、PostgreSQLの機能
    // (学習メモ): %${word}%` 前後に%で部分一致検索 :wordに%${word}%が入る
    // (学習メモ): :q と { q: ... } SQLインジェクション対策
    if (word) {
      qb = qb.andWhere('micro_post.content ILIKE :word', { word: `%${word}%` });
    }

    if (user_name) {
      qb = qb.andWhere('user.name ILIKE :user_name', {
        user_name: `%${user_name}%`,
      });
    }

    type ResultType = {
      id: number;
      content: string;
      user_id: number;
      user_name: string;
      user_icon: string;
      created_at: Date;
    };
    const records = await qb.getRawMany<ResultType>();

    return records.map((record) => ({
      ...record,
      created_at: record.created_at.toISOString(),
    }));
  }
}

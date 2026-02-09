import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// 追加
import { createHash } from 'crypto';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async getAuth(name: string, password: string) {
    // name, passwordからUserレコード検索
    if (!password) {
      throw new UnauthorizedException();
    }

    //NOTE: パスワードから該当のユーザを検索する処理
    // crypto.は削除
    const hash = createHash('md5').update(password).digest('hex');
    const user = await this.userRepository.findOne({
      where: {
        name: Equal(name),
        hash: Equal(hash),
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // NOTE: authtableへのレコードの挿入

    const ret = {
      token: '',
      user_id: user.id,
    };

    // NOTE: 認証レコード作成
    const expire = new Date();
    expire.setDate(expire.getDate() + 1);

    const auth = await this.authRepository.findOne({
      where: {
        user_id: Equal(user.id),
      },
    });

    if (auth) {
      // 更新
      auth.expire_at = expire;
      await this.authRepository.save(auth);
      ret.token = auth.token;
    } else {
      // 挿入
      const token = crypto.randomUUID();
      const record = {
        user_id: user.id,
        token: token,
        expire_at: expire.toISOString(),
      };
      await this.authRepository.save(record);
      ret.token = token;
    }
    return ret;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';
import * as jwt from '@nestjs/jwt';
import * as sha256 from 'js-sha256';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: jwt.JwtService,
  ) { }

  async getAuth(name: string, password: string) {
    // name, passwordからUserレコード検索
    if (!password) {
      throw new UnauthorizedException();
    }

    // ユーザー取得
    const user = await this.userRepository.findOne({
      where: {
        name: Equal(name),
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    //NOTE: パスワードから該当のユーザを検索する処理
    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    // レスポンスの作成
    const ret = {
      token: '',
      user_id: user.id,
    };

    // NOTE: 認証レコード作成
    const expire = new Date();
    expire.setDate(expire.getDate() + 30);

    const auth = await this.authRepository.findOne({
      where: {
        user_id: Equal(user.id),
      },
    });

    // NOTE: 挿入
    // const token = crypto.randomUUID();
    const payload = {
      sub: user.id,
      name: user.name,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.ACCESS_SECRET_KEY,
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.REFRESH_SECRET_KEY,
    });

    // refresh_tokenのhashを作成
    const refresh_token_hash = sha256.sha256(refresh_token);

    const record = {
      user_id: user.id,
      token: refresh_token_hash,
      expire_at: expire.toISOString(),
    };
    if (auth) {
      await this.authRepository.update(auth.id, record);
    } else {
      await this.authRepository.save(record);
    }

    // レスポンス
    ret.token = access_token;

    return ret;
  }
}

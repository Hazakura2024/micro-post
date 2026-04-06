import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, MoreThan, Repository } from 'typeorm';
import * as jwt from '@nestjs/jwt';
import * as sha256 from 'js-sha256';
import { JwtUser } from './types/jwt-user.type';
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
    const resData = {
      user_id: ret.user_id,
      access_token: access_token,
      // TODO: 将来的にcookieに保存する
      refresh_token: refresh_token,
    };

    return resData;
  }

  async refreshAuth(refresh_token: string) {
    if (!refresh_token || typeof refresh_token !== 'string') {
      throw new UnauthorizedException('refresh_token がありません');
    }
    const refresh_token_hash = sha256.sha256(refresh_token);

    // NOTE: 署名検証
    let decoded: JwtUser;
    try {
      decoded = this.jwtService.verify<JwtUser>(refresh_token, {
        secret: process.env.REFRESH_SECRET_KEY,
      });
    } catch {
      throw new UnauthorizedException('不正なrefresh_tokenです');
    }

    const auth = await this.authRepository.findOne({
      where: {
        token: Equal(refresh_token_hash),
        user_id: Equal(decoded.sub),
        expire_at: MoreThan(new Date()),
      },
    });
    if (!auth) {
      throw new UnauthorizedException();
    }

    const userData = await this.userRepository.findOne({
      where: {
        id: Equal(auth.user_id),
      },
    });
    if (!userData) {
      throw new NotFoundException();
    }

    const payload = {
      sub: userData.id,
      name: userData.name,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.ACCESS_SECRET_KEY,
    });

    const expire = new Date();
    expire.setDate(expire.getDate() + 30);
    const new_refresh_token = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.REFRESH_SECRET_KEY,
    });
    const new_refresh_token_hash = sha256.sha256(new_refresh_token);

    auth.token = new_refresh_token_hash;
    auth.expire_at = expire;
    await this.authRepository.update(auth.id, auth);

    const resData = {
      user_id: auth.user_id,
      access_token: access_token,
      // TODO: 将来的にcookieに保存する
      refresh_token: new_refresh_token,
    };

    return resData;
  }

  async logout() {

  }
}

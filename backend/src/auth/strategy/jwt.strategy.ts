import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '../types/jwt-user.type';

@Injectable()
// (学習メモ): 第二引数は省略できるが、デフォルトでPassportStrategy(Strategy, 'jwt')となり、AuthGuard('jwt')で呼び出せる
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // (学習メモ): 親クラスのコンストラクタに引数を渡すことで設定できる。
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_SECRET_KEY!,
        })
    }

    async validate(payload: JwtUser) {
        return {
            sub: payload.sub,
            name: payload.name,
        }
    }
}

// (学習メモ): PassportStrategy を継承したクラスでは、必ず validate という名前のメソッドを作らなければならないというルールがあります
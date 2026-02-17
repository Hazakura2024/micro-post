import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) { }

  // NOTE: createUserを作成
  async createUser(name: string, email: string, password: string) {

    // NOTE: メールアドレスの重複チェック
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: Equal(email) },
    });
    if (existingUserByEmail) {
      throw new ConflictException('このメールアドレスは登録されています。');
    }

    // NOTE: ユーザー名の重複チェック
    const existingUserByName = await this.userRepository.findOne({
      where: { name: Equal(name) },
    });
    if (existingUserByName) {
      throw new ConflictException('このユーザー名は使用されています。');
    }

    // NOTE: ユーザー作成
    const hash = createHash('md5').update(password).digest('hex');
    const record = {
      name: name,
      email: email,
      hash: hash,
    };
    const savedUser = await this.userRepository.save(record);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.created_at,
    };
  }

  //NOTE: ユーザー取得
  async getUser(token: string, id: number) {
    // ログイン済かチェック
    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });

    if (!auth) {
      throw new ForbiddenException();
    }

    // ユーザー取得
    const user = await this.userRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    };
  }
}

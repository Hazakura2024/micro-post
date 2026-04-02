import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { promises } from 'fs';
import { extname, join } from 'path';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, MoreThan, Repository } from 'typeorm';
import { JwtUser } from 'src/auth/types/jwt-user.type';

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
    const hash = await bcrypt.hash(password, 10);
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
  async getUser(user: JwtUser) {

    // ユーザー取得
    const userData = await this.userRepository.findOne({
      where: {
        id: Equal(user.sub),
      },
    });
    if (!userData) {
      throw new NotFoundException();
    }
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      icon_path: userData.icon_path,
      createdAt: userData.created_at,
    };
  }

  // ユーザー名変更
  async editName(user: JwtUser, name: string) {

    // NOTE: ユーザー名の重複チェック
    const existingUserByName = await this.userRepository.findOne({
      where: { name: Equal(name) },
    });
    if (existingUserByName && existingUserByName.id !== user.sub) {
      throw new ConflictException('このユーザー名は使用されています。');
    }

    // ユーザー取得
    const userData = await this.userRepository.findOne({
      where: {
        id: Equal(user.sub),
      },
    });
    if (!userData) {
      throw new NotFoundException();
    }

    userData.name = name;

    const savedUser = await this.userRepository.save(userData);
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.created_at,
    };
  }

  async uploadImage(token: string, file: Express.Multer.File) {
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
        id: Equal(auth.user_id),
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    // 保存先ディレクトリ
    const userDir = join(process.cwd(), 'uploads', 'users', String(user.id));
    await promises.mkdir(userDir, { recursive: true });

    // ランダムファイル名を作成
    const ext = extname(file.originalname) || '.bin';
    const filename = `${randomUUID()}${ext}`;
    const absPath = join(userDir, filename);

    // ストレージに保存
    await promises.writeFile(absPath, file.buffer);

    // DBに保存する相対パス
    const nextIconPath = `/uploads/users/${user.id}/${filename}`;

    // DBに新URL保存
    const prevIconPath = user.icon_path;
    user.icon_path = nextIconPath;
    await this.userRepository.save(user);

    // 旧画像削除
    if (prevIconPath) {
      const prevAbsPath = join(process.cwd(), prevIconPath.replace(/^\//, ''));
      try {
        await promises.unlink(prevAbsPath);
      } catch {
        // 削除失敗は無視
      }
    }

    return {
      id: user.id,
      name: user.name,
      icon_path: user.icon_path,
    };
  }

  async getIcon(token: string) {
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
        id: Equal(auth.user_id),
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user.icon_path;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';

describe('UserController', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: UserService, // UserServiceの差し替え
          useValue: {
            getUser: jest.fn().mockReturnValue({}), // getUser関数の差し替え
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService); // 差し替え用のサービスを作成
  });

  // テスト本体
  it('should be defined', async () => {
    const spy = jest.spyOn(service, 'getUser');
    const controller = new UserController(service); // テスト対象のコントローラ作成
    await controller.getUser(1, 'xxx-xxx-xxx-xxx'); // getUser関数の呼び出し
    expect(spy).toHaveBeenCalledTimes(1); // 呼び出し回数の確認
  });
});

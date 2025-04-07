import { DuplicateError, UsersService } from "./users.service";
import { Test } from "@nestjs/testing";
import { UsersController } from "./users.controller";

describe('CRUD in UserService', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersController,
      ],
    //   мокаем не код, а базу данных целиком (ин-мемори база данных)
    }).compile();

  });

бефо алл - создаем 2 пользователя

  it('гет запрос на 1 дает пользоывателя', async () => {
  });

  it('гет запрос на /дает список из 2 пользоывателей', async () => {
  });

  it('пост запрос с таким же логином как у первого падате с ошибкой ', async () => {
  });

  it('пост запрос с новым логином возврщает имя пользователя ', async () => {
  });

  it('пост запрос с пустым логином - возвращает ошибку ', async () => {
  });


});
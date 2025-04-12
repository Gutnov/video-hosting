import { DuplicateError, UsersService } from "./users.service";
import * as request from 'supertest';

import { Test } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../database/database.module";
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.model";
import { INestApplication } from "@nestjs/common";
import { UsersModule } from "./users.module";

describe('CRUD in UserService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule]
    })
      .overrideProvider("Sequelize")
      .useFactory({
        // inject: [],
        factory: async () => {
              const sequelize = new Sequelize({
                storage: ':memory:',
                dialect: 'sqlite',
              });
              sequelize.addModels([User]);
              await sequelize.sync();
              return sequelize;
        }
      })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();

  });

  beforeAll(async ()=>{
    await User.create({login: "123", password: "123", firstName: "123"})
    // создаем 2 пользователя
  })

  it(`/GET userId = 1`, () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({
        data: "123",
      });
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
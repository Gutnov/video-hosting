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
    await User.create({login: "User1", password: "123", firstName: "Vasya", secondName: "Petrov"})
    await User.create({login: "User2", password: "123", firstName: "Sahsha", secondName: "Ivanov"})
    // создаем 2 пользователя
  })

  it(`/GET userId = 1`, () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({id: 1, login: "User1", firstName: "Vasya", secondName: "Petrov"});
  });

  it('гет запрос на /дает список из 2 пользоывателей', async () => {
    return request(app.getHttpServer())
    .get('/users')
    .expect(200)
    .expect([
      {id: 1, login: "User1", firstName: "Vasya", secondName: "Petrov"},
      {id: 2, login: "User2", firstName: "Sahsha", secondName: "Ivanov"},
    ]);
  });

  it('пост запрос с таким же логином как у первого падате с ошибкой ', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({login: "User1", password: "123", firstName: "Vasya", secondName: "Petrov"})
      .expect(400)
  });

  it('пост запрос с новым логином возврщает имя пользователя ', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({login: "User3", password: "123", firstName: "Ilya", secondName: "Popov"})
      .expect(201)
      .expect({ id: 3, login: "User3", secondName: "Popov", firstName: "Ilya" })
  });

  it('пост запрос с пустым логином - возвращает ошибку ', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({login: "", password: "123", firstName: "Ilya", secondName: "Popov"})
      .expect(400)
  });
});
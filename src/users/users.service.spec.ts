import { DuplicateError, UsersService } from "./users.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Test } from "@nestjs/testing";

describe('CRUD in UserService', () => {
  let service: UsersService = undefined;
  const mockUserRepository = {
    findByPk: jest.fn(),
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User), useValue: mockUserRepository},
      ],
    }).compile();

    service = moduleRef.get(UsersService);
  });

  afterEach(()=>{
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  it('getUser should call repository with user id and return user from repository', async () => {
    jest.spyOn(mockUserRepository, 'findByPk').mockReturnValue({id: 1, name: "John"});
    const result = await service.getUser(12)

    expect(result).toStrictEqual({id: 1, name: "John"});
    expect(mockUserRepository.findByPk).toBeCalledWith(12)
  });

  it('create user should throw an error when user exists', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue({id: 1, name: "John"});
    await expect(async () => {
      // @ts-expect-error simplified for tests
      await service.createUser({login: "123", password: "123"})
    }).rejects.toThrow(DuplicateError)
  })
});
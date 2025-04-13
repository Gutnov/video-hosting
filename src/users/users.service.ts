import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto, UserDto } from './users.dto';
import { hashPassword, comparePasswords } from './hash';

export class DuplicateError extends Error {}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { login: userDto.login },
    });

    if (existing)
      throw new DuplicateError('Пользователь с таким логином уже существует');

    const hashedPwd = await hashPassword(userDto.password);

    const newUser = await this.userRepository.create({
      ...userDto,
      password: hashedPwd,
    });

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findByPk(id);
  }

  async updateUser(userId: number, updateDto: Partial<UserDto>): Promise<User> {
    await this.userRepository.update(updateDto, { where: { id: userId } });
    return this.getUser(userId);
  }

  async deleteUser(userId: number): Promise<null> {
    await this.userRepository.destroy({ where: { id: userId } });
    return null;
  }

  async validateUser(login: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      return false;
    }
    return await comparePasswords(password, user.password);
  }
}

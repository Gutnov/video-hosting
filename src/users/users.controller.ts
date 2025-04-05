import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DuplicateError, UsersService } from './users.service';
import { CreateUserDto, UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<UserDto> {
    try {
      const newUser = await this.userService.createUser(userDto);
      return {
        id: newUser.id,
        login: newUser.login,
        secondName: newUser.secondName,
        firstName: newUser.firstName,
      };
    } catch (error) {
      if (error instanceof DuplicateError) {
        throw new BadRequestException('User already exists');
      }
      throw error;
    }
  }

  @Put('/:userId/')
  async updateUserRoles(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: Partial<UserDto>,
  ): Promise<UserDto> {
    return this.userService.updateUser(userId, dto);
  }

  @Get('/:userId/')
  async getCompanyData(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserDto> {
    const data = await this.userService.getUser(userId);
    return {
      id: data.id,
      login: data.login,
      secondName: data.secondName,
      firstName: data.firstName,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId/')
  async updateCompanyData(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.deleteUser(userId);
    return 'OK';
  }
}

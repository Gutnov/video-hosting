import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

class UserDataDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  secondName?: string;
}

export class CreateUserDto extends UserDataDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserDto extends UserDataDto {
  @Min(0)
  @IsNumber()
  id: number;
}

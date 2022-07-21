import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('signup')
  async signup(@Body() input: UpdateUserDto) {
    const response = await this.UsersService.signup(input);
    return response;
  }

  @Post('signin')
  async signin(@Body() input: UserDto) {
    const response = await this.UsersService.signin(input);

    return response;
  }
}

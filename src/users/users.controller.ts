import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
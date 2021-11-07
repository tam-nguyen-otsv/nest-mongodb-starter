import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { User } from '../schemas';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}

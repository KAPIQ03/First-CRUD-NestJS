import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  // get one number
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }
  // create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }
  // update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User | null> {
    return await this.usersService.update(id, user);
  }
  // delete user
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    //handle the error if user not found
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return await this.usersService.delete(id);
    }
  }
}

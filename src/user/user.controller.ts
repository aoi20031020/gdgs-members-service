import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ユーザー作成
  @Post()
  async create(
    @Body() body: { email: string; name: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(body.email, body.name);
  }

  // ユーザーIDで取得
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }

  // 全ユーザーを取得
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // ユーザー更新
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ): Promise<User> {
    return this.userService.updateUser(Number(id), body.name, body.email);
  }

  // ユーザー削除
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Options,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Options()
  preflight() {
    return {};
  }

  // ユーザー作成
  @Post()
  async create(@Body() data: User): Promise<User> {
    await console.log(data);
    return await this.userService.createUser(data);
  }

  // 学籍番号で取得
  @Get(':id')
  async findOne(@Param('id') studentId: string): Promise<User | null> {
    return this.userService.getUserById(studentId);
  }

  // 全ユーザーを取得
  @Get()
  async findAll(): Promise<User[] | null> {
    return this.userService.getAllUsers();
  }

  // ユーザー更新
  @Put(':id')
  async update(
    @Param('id') studentId: string,
    @Body() data: User,
  ): Promise<User> {
    return this.userService.updateUser(studentId, data);
  }

  // ユーザー削除
  @Delete(':id')
  async remove(@Param('id') studentId: string): Promise<User> {
    return this.userService.deleteUser(studentId);
  }
}

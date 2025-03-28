import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // JwtAuthGuard をインポート
import { UserService } from './user.service';
import { User } from './user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ユーザー作成
  @Post()
  async create(@Body() data: User): Promise<User> {
    await console.log(data);
    return await this.userService.createUser(data);
  }

  // 学籍番号で取得 (認証が必要)
  @Get(':id')
  @UseGuards(JwtAuthGuard) // JWT トークンが必要
  async findOne(@Param('id') studentId: string): Promise<User | null> {
    return this.userService.getUserById(studentId);
  }

  // 全ユーザーを取得 (認証が必要)
  @Get()
  @UseGuards(JwtAuthGuard) // JWT トークンが必要
  async findAll(): Promise<User[] | null> {
    return this.userService.getAllUsers();
  }

  // ユーザー更新 (認証が必要)
  @Put(':id')
  @UseGuards(JwtAuthGuard) // JWT トークンが必要
  async update(
    @Param('id') studentId: string,
    @Body() data: User,
  ): Promise<User> {
    return this.userService.updateUser(studentId, data);
  }

  // ユーザー削除 (認証が必要)
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // JWT トークンが必要
  async remove(@Param('id') studentId: string): Promise<User> {
    return this.userService.deleteUser(studentId);
  }
}

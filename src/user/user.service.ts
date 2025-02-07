import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // ユーザー作成
  async createUser(email: string, name: string): Promise<User> {
    return this.userRepository.create(email, name);
  }

  // ユーザーIDで取得
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  // 全ユーザーを取得
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // ユーザー更新
  async updateUser(id: number, name: string, email: string): Promise<User> {
    return this.userRepository.update(id, name, email);
  }

  // ユーザー削除
  async deleteUser(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
}

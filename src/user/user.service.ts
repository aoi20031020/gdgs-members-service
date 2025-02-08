import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.type';
import { User as OutputUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // ユーザー作成
  async createUser(data: User): Promise<User> {
    const user = await this.userRepository.create(data);
    return this.convertToUserType(user);
  }

  // ユーザーIDで取得
  async getUserById(schoolId: string): Promise<User | null> {
    const user = await this.userRepository.findById(schoolId);
    return this.convertToUserType(user);
  }

  // 全ユーザーを取得
  async getAllUsers(): Promise<User[] | null> {
    const users = await this.userRepository.findAll();
    return Promise.all(users.map((user) => this.convertToUserType(user)));
  }

  // ユーザー更新
  async updateUser(schoolId: string, data: User): Promise<User> {
    const user = await this.userRepository.update(schoolId, data);
    return this.convertToUserType(user);
  }

  // ユーザー削除
  async deleteUser(schoolId: string): Promise<User> {
    const user = await this.userRepository.delete(schoolId);
    return this.convertToUserType(user);
  }

  // ユーザー型に変換
  async convertToUserType(data: OutputUser): Promise<User> {
    return {
      name: data.name ?? '',
      studentId: data.student_id ?? '',
      email: data.email ?? '',
      year: data.year ?? 0,
      teamEvent: data.team_event ?? false,
      teamMarketing: data.team_marketing ?? false,
      teamTechnology: data.team_technology ?? false,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ユーザーを作成する
  async create(email: string, name: string): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: { email, name },
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // ユーザーをIDで取得する
  async findById(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true }, // 必要なフィールドのみ選択
      });
    } catch (error) {
      throw new Error(`Failed to find user with id ${id}: ${error.message}`);
    }
  }

  // 全ユーザーを取得する
  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  // ユーザーを更新する
  async update(id: number, name: string, email: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { name, email },
      });
    } catch (error) {
      throw new Error(`Failed to update user with id ${id}: ${error.message}`);
    }
  }

  // ユーザーを削除する
  async delete(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
    }
  }

  // トランザクションを使用して複数の操作を行う
  async createWithTransaction(email: string, name: string): Promise<User> {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      return await prisma.user.create({
        data: { email, name },
      });
    });

    return transaction;
  }
}

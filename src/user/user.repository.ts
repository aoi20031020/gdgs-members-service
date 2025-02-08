import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as InputUser } from './user.type';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ユーザーを作成する
  async create(data: InputUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          school_id: data.schoolId,
          email: data.email,
          year: data.year,
          team_event: data.teamEvent,
          team_marketing: data.teamMarketing,
          team_technology: data.teamTechnology,
          role: data.role,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // ユーザーをIDで取得する
  async findById(schoolId: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { school_id: schoolId },
      });
    } catch (error) {
      throw new Error(
        `Failed to find user with id ${schoolId}: ${error.message}`,
      );
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
  async update(schoolId: string, data: InputUser): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { school_id: schoolId },
        data: {
          name: data.name,
          school_id: data.schoolId,
          email: data.email,
          year: data.year,
          team_event: data.teamEvent,
          team_marketing: data.teamMarketing,
          team_technology: data.teamTechnology,
          role: data.role,
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to update user with id ${schoolId}: ${error.message}`,
      );
    }
  }

  // ユーザーを削除する
  async delete(schoolId: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { school_id: schoolId },
      });
    } catch (error) {
      throw new Error(
        `Failed to delete user with id ${schoolId}: ${error.message}`,
      );
    }
  }

  // トランザクションを使用して複数の操作を行う
  async createWithTransaction(data: InputUser): Promise<User> {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      return await prisma.user.create({
        data: {
          name: data.name,
          school_id: data.schoolId,
          email: data.email,
          year: data.year,
          team_event: data.teamEvent,
          team_marketing: data.teamMarketing,
          team_technology: data.teamTechnology,
          role: data.role,
        },
      });
    });

    return transaction;
  }
}

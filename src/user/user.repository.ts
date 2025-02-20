import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as InputUser } from './user.type';
import { Role, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ユーザーを作成する
  async create(data: InputUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          student_id: data.studentId,
          name: data.name,
          email: data.email,
          year: data.year,
          team_event: data.teamEvent,
          team_marketing: data.teamMarketing,
          team_technology: data.teamTechnology,
          role: Role.MEMBER,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // ユーザーをIDで取得する
  async findById(studentId: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { student_id: studentId },
      });
    } catch (error) {
      throw new Error(
        `Failed to find user with id ${studentId}: ${error.message}`,
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
  async update(studentId: string, data: InputUser): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { student_id: studentId },
        data: {
          student_id: data.studentId,
          name: data.name,
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
        `Failed to update user with id ${studentId}: ${error.message}`,
      );
    }
  }

  // ユーザーを削除する
  async delete(studentId: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { student_id: studentId },
      });
    } catch (error) {
      throw new Error(
        `Failed to delete user with id ${studentId}: ${error.message}`,
      );
    }
  }

  // トランザクションを使用して複数の操作を行う
  async createWithTransaction(data: InputUser): Promise<User> {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      return await prisma.user.create({
        data: {
          student_id: data.studentId,
          name: data.name,
          email: data.email,
          year: data.year,
          team_event: data.teamEvent,
          team_marketing: data.teamMarketing,
          team_technology: data.teamTechnology,
          role: Role.MEMBER,
        },
      });
    });

    return transaction;
  }
}

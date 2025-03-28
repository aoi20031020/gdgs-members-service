import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/user.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByStudentId(studentId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { student_id: studentId }, // ✅ Prisma のカラム名は snake_case
    });

    if (!user) return null;

    // ✅ Prisma からのレスポンスを camelCase に変換
    return {
      id: user.id,
      studentId: user.student_id,
      name: user.name,
      email: user.email,
      year: user.year,
      teamTechnology: user.team_technology,
      teamMarketing: user.team_marketing,
      teamEvent: user.team_event,
      role: user.role,
    };
  }
}

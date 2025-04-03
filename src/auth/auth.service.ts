import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, AuthContent } from './auth.type';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: Auth): Promise<AuthContent> {
    // 学籍番号でユーザーを検索
    const user = await this.authRepository.findByStudentId(data.studentId);

    // ユーザーが存在しない、または氏名が一致しない場合はエラー
    if (!user || user.name !== data.fullName) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 'MEMBER' の場合は認証しない
    if (user.role === 'MEMBER') {
      throw new ForbiddenException('Permission denied');
    }

    // JWT トークンを発行
    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return { token };
  }
}

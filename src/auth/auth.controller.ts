import { Controller, Post, Body, Options } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, AuthContent } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Options()
  preflight() {
    return {};
  }

  @Post('login')
  async login(@Body() data: Auth): Promise<AuthContent> {
    return this.authService.login(data);
  }
}

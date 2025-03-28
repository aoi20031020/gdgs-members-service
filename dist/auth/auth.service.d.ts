import { JwtService } from '@nestjs/jwt';
import { Auth, AuthContent } from './auth.type';
import { AuthRepository } from './auth.repository';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    login(data: Auth): Promise<AuthContent>;
}

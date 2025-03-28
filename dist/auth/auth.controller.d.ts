import { AuthService } from './auth.service';
import { Auth, AuthContent } from './auth.type';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    preflight(): {};
    login(data: Auth): Promise<AuthContent>;
}

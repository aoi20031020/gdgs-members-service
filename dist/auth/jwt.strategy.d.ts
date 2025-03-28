import { JwtPayload } from './auth.type';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: number;
        role: "ADMIN" | "DEVELOPER" | "MEMBER" | "CORE_MEMBER";
    }>;
}
export {};

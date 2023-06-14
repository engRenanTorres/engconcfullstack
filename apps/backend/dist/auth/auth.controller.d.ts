import { AuthService } from "./auth.service";
import { SigninDTO } from "../users/dto/signin.dto";
import { User } from "../users/entities/user.entity";
import { ReqHeaders } from "./models/req-headers.model";
interface ReqLocal extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signinDTO: SigninDTO, req: ReqLocal): Promise<object>;
    session(headers: ReqHeaders): Promise<object>;
}
export {};

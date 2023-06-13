import { UserFindSwagger } from '../../users/swagger/index-users.swagger';
export declare class SessionReponseOk {
    valid: boolean;
    credencials: UserFindSwagger;
}
export declare class SessionResponseInvalid {
    statusCode: 400;
    message: string;
    error: string;
}

export declare class IndexUsersSwagger {
    name: string;
    email: string;
    password: string;
    roles: number;
}
declare const UserFindSwagger_base: import("@nestjs/common").Type<Omit<IndexUsersSwagger, "password">>;
export declare class UserFindSwagger extends UserFindSwagger_base {
}
export declare class InvalidPasswordResponse {
    statusCode: 400;
    message: [
        "The password must == Capital letter, lowercase, numbers, special caracters and have at least 6 digits."
    ];
    error: "Bad Request";
}
export {};

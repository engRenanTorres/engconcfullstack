import { Role } from "./role.enum";
import { Question } from "../../question/entities/question.entity";
export declare class User {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    password: string;
    roles: Role;
    insertedQuestions: Question[];
    updatedQuestions: Question[];
    constructor(user: Partial<User>);
    hasPassword(): void;
}

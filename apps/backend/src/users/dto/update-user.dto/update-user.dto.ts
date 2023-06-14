import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "../create-user.dto";

//PartialTypes copia os mesmo campos da classe referenciada, mas deixa os campos como opcionais
export class UpdateUserDto extends PartialType(CreateUserDto) {}

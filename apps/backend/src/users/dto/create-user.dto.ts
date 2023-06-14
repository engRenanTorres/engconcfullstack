import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";
import { MessagesHelper } from "../../helpers/message.helper";
import { RegexHelper } from "../../helpers/regex.helper";
import { Role } from "../entities/role.enum";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class CreateSpecialUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nome completo da empresa." })
  readonly name: string;
  @IsString()
  @ApiProperty({ description: "Cnpj da empresa." })
  @Matches(RegexHelper.cnpj, {
    message: MessagesHelper.CNPJ_VALID,
  })
  readonly cnpj: string;
  @IsNotEmpty()
  @ApiProperty({ description: "Email para acesso da empresa." })
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: MessagesHelper.PASSWORD_VALID })
  @Matches(RegexHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  readonly password: string;
  @IsNumber()
  @ApiProperty({ description: "Nível de acesso do usuário.", default: 1 })
  readonly roles: Role = 1;
}

export class CreateUserDto extends OmitType(CreateSpecialUserDto, ["roles"]) {}

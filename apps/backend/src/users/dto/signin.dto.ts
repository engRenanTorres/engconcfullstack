import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password: string;
}

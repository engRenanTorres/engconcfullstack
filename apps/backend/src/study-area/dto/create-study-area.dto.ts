import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateStudyAreaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nome da área." })
  readonly name: string;
  @IsString()
  @ApiProperty({ description: "Descrição da área." })
  readonly about: string;
}

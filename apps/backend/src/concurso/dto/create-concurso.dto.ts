import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";
import { Institute } from "../../institute/entities/institute.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConcursoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Concurso`s name." })
  name: string;
  @IsString()
  @ApiProperty({ description: "infos" })
  about: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "year that the test was applied" })
  year: number;
  @IsNotEmpty()
  @ApiProperty({ description: "banca do concurso" })
  institute: Institute;
}

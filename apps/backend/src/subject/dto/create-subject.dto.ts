import { IsNotEmpty, IsString } from "class-validator";
import { StudyArea } from "../../study-area/entities/study-area.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nome da matéria." })
  name: string;
  @IsNotEmpty()
  @ApiProperty({ description: "Nome da área." })
  area: StudyArea;
  @IsString()
  @ApiProperty({ description: "Sobre a matéria em questão." })
  about: string;
}

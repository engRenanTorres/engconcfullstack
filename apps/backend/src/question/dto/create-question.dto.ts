import { IsArray, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChoicesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Escolha da questão." })
  choice: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Texto da questão." })
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Tipo da questão (true-false or multiplechoice).",
  })
  @Matches(/^(true-false|multiplechoice)$/, {
    message: "Type accepts only the values 'true-false' or 'multiplechoice'.",
  })
  type: string;

  @IsArray()
  @ApiProperty({ type: CreateChoicesDto, isArray: true })
  questionsChoices: CreateChoicesDto[];
}

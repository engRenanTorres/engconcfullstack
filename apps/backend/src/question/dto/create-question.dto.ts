import { IsArray, IsInt, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Answer } from "../entities/question.entity";
import { Level } from "../../levels/entities/level.entity";
import { Subject } from "../../subject/entities/subject.entity";
import { User } from "../../users/entities/user.entity";
import { Concurso } from "../../concurso/entities/concurso.entity";

export class CreateChoicesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Possible answer to question." })
  choice: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Question text." })
  question: string;

  @IsNotEmpty()
  @ApiProperty({
    type: "enum",
    enum: Answer,
    description: "Answer of the question.",
  })
  answer: Answer;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Explaning tips." })
  tip: string;

  @IsInt()
  @IsNotEmpty()
  levelId: number;

  @IsInt()
  @IsNotEmpty()
  subjectId: number;
  @IsInt()
  @IsNotEmpty()
  concursoId: number;

  @IsArray()
  @ApiProperty({ type: CreateChoicesDto, isArray: true })
  questionsChoices: CreateChoicesDto[];
}

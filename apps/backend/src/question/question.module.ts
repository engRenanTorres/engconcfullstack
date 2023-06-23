import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { DatabaseModule } from "../database/database.module";
import { questionProviders } from "./question.providers";
import { LevelModule } from "../levels/level.module";
import { ConcursoModule } from "../concurso/concurso.module";
import { SubjectModule } from "../subject/subject.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    DatabaseModule,
    LevelModule,
    ConcursoModule,
    SubjectModule,
    UsersModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, ...questionProviders],
  exports: [QuestionService],
})
export class QuestionModule {}

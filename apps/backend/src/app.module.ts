import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { InstituteModule } from "./institute/institute.module";
import { StudyAreaModule } from "./study-area/study-area.module";
import { SubjectModule } from "./subject/subject.module";
import { QuestionModule } from "./question/question.module";
import { LevelModule } from "./levels/level.module";
import { ConcursoModule } from "./concurso/concurso.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SubjectModule,
    StudyAreaModule,
    QuestionModule,
    ConcursoModule,
    LevelModule,
    InstituteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "frontend", "dist"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

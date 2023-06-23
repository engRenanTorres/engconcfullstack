import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectController } from "./subject.controller";
import { DatabaseModule } from "../database/database.module";
import { subjectProviders } from "./subject.providers";
import { StudyAreaModule } from "../study-area/study-area.module";

@Module({
  imports: [DatabaseModule, StudyAreaModule],
  controllers: [SubjectController],
  providers: [SubjectService, ...subjectProviders],
  exports: [SubjectService],
})
export class SubjectModule {}

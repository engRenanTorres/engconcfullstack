import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectController } from "./subject.controller";
import { DatabaseModule } from "../database/database.module";
import { subjectProviders } from "./subject.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectController],
  providers: [SubjectService, ...subjectProviders],
  exports: [SubjectService],
})
export class SubjectModule {}

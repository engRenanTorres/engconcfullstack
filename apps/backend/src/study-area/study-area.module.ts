import { Module } from "@nestjs/common";
import { StudyAreaService } from "./study-area.service";
import { StudyAreaController } from "./study-area.controller";
import { DatabaseModule } from "../database/database.module";
import { studyAreaProviders } from "./study-area.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [StudyAreaController],
  providers: [StudyAreaService, ...studyAreaProviders],
  exports: [StudyAreaService],
})
export class StudyAreaModule {}

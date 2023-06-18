import { Module } from "@nestjs/common";
import { LevelService } from "./question.service";
import { QuestionController } from "./question.controller";
import { DatabaseModule } from "../database/database.module";
import { questionProviders } from "./question.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [LevelService, ...questionProviders],
})
export class QuestionModule {}

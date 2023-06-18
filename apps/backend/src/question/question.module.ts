import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { DatabaseModule } from "../database/database.module";
import { questionProviders } from "./question.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [QuestionService, ...questionProviders],
  exports: [QuestionService],
})
export class QuestionModule {}

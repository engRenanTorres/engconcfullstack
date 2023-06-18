import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LevelService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Controller("level")
export class QuestionController {
  constructor(private readonly questionService: LevelService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLevelDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateLevelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.questionService.remove(+id);
  }
}

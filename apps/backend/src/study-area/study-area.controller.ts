import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StudyAreaService } from "./study-area.service";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Study Area")
@Controller("study-area")
export class StudyAreaController {
  constructor(private readonly studyAreaService: StudyAreaService) {}

  @Post()
  create(@Body() createStudyAreaDto: CreateStudyAreaDto) {
    return this.studyAreaService.create(createStudyAreaDto);
  }

  @Get()
  findAll() {
    return this.studyAreaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.studyAreaService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStudyAreaDto: UpdateStudyAreaDto
  ) {
    return this.studyAreaService.update(+id, updateStudyAreaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.studyAreaService.remove(+id);
  }
}

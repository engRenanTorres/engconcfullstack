import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LevelService } from "./level.service";
import { CreateLevelDto } from "./dto/create-level.dto";
import { UpdateLevelDto } from "./dto/update-level.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Level")
@Controller("level")
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.levelService.findById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.levelService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { StudyAreaService } from "./study-area.service";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/entities/role.enum";

@ApiTags("Study Area")
@Controller("api/study-area")
export class StudyAreaController {
  constructor(private readonly studyAreaService: StudyAreaService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
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
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  update(
    @Param("id") id: string,
    @Body() updateStudyAreaDto: UpdateStudyAreaDto
  ) {
    return this.studyAreaService.update(+id, updateStudyAreaDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  remove(@Param("id") id: string) {
    return this.studyAreaService.remove(+id);
  }
}

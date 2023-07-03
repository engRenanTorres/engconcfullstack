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
import { InstituteService } from "./institute.service";
import { CreateInstituteDto } from "./dto/create-institute.dto";
import { UpdateInstituteDto } from "./dto/update-institute.dto";
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/entities/role.enum";

@ApiTags("Institute")
@Controller("api/institute")
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  create(@Body() createInstituteDto: CreateInstituteDto) {
    return this.instituteService.create(createInstituteDto);
  }

  @Get()
  findAll() {
    return this.instituteService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.instituteService.findById(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  update(
    @Param("id") id: string,
    @Body() updateInstituteDto: UpdateInstituteDto
  ) {
    return this.instituteService.update(+id, updateInstituteDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  remove(@Param("id") id: string) {
    return this.instituteService.remove(+id);
  }
}

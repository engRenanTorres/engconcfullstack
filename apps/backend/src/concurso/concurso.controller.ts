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
import { ConcursoService } from "./concurso.service";
import { CreateConcursoDto } from "./dto/create-concurso.dto";
import { UpdateConcursoDto } from "./dto/update-concurso.dto";
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/entities/role.enum";

@ApiTags("Concurso")
@Controller("api/concurso")
export class ConcursoController {
  constructor(private readonly concursoService: ConcursoService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  create(@Body() createConcursoDto: CreateConcursoDto) {
    return this.concursoService.create(createConcursoDto);
  }

  @Get()
  findAll() {
    return this.concursoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.concursoService.findById(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  update(
    @Param("id") id: string,
    @Body() updateConcursoDto: UpdateConcursoDto
  ) {
    return this.concursoService.update(+id, updateConcursoDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  remove(@Param("id") id: string) {
    return this.concursoService.remove(+id);
  }
}

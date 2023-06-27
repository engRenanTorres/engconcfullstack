import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ConcursoService } from "./concurso.service";
import { CreateConcursoDto } from "./dto/create-concurso.dto";
import { UpdateConcursoDto } from "./dto/update-concurso.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Concurso")
@Controller("api/concurso")
export class ConcursoController {
  constructor(private readonly concursoService: ConcursoService) {}

  @Post()
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
  update(
    @Param("id") id: string,
    @Body() updateConcursoDto: UpdateConcursoDto
  ) {
    return this.concursoService.update(+id, updateConcursoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.concursoService.remove(+id);
  }
}

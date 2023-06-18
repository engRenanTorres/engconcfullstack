import { PartialType } from "@nestjs/swagger";
import { CreateConcursoDto } from "./create-concurso.dto";

export class UpdateConcursoDto extends PartialType(CreateConcursoDto) {}

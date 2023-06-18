import { Module } from "@nestjs/common";
import { ConcursoService } from "./concurso.service";
import { ConcursoController } from "./concurso.controller";
import { DatabaseModule } from "../database/database.module";
import { concursoProviders } from "./concurso.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [ConcursoController],
  providers: [ConcursoService, ...concursoProviders],
})
export class ConcursoModule {}

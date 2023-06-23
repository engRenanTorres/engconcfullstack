import { Module } from "@nestjs/common";
import { ConcursoService } from "./concurso.service";
import { ConcursoController } from "./concurso.controller";
import { DatabaseModule } from "../database/database.module";
import { concursoProviders } from "./concurso.providers";
import { InstituteModule } from "../institute/institute.module";

@Module({
  imports: [DatabaseModule, InstituteModule],
  controllers: [ConcursoController],
  providers: [ConcursoService, ...concursoProviders],
  exports: [ConcursoService],
})
export class ConcursoModule {}

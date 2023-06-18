import { Module } from "@nestjs/common";
import { InstituteService } from "./institute.service";
import { InstituteController } from "./institute.controller";
import { DatabaseModule } from "../database/database.module";
import { instituteProviders } from "./institute.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [InstituteController],
  providers: [InstituteService, ...instituteProviders],
  exports: [InstituteService],
})
export class InstituteModule {}

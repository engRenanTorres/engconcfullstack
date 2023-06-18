import { Module } from "@nestjs/common";
import { LevelService } from "./level.service";
import { LevelController } from "./level.controller";
import { DatabaseModule } from "../database/database.module";
import { levelProviders } from "./level.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [LevelController],
  providers: [LevelService, ...levelProviders],
  exports: [LevelService],
})
export class LevelModule {}

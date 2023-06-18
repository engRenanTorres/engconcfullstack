import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CreateLevelDto } from "./dto/create-level.dto";
import { UpdateLevelDto } from "./dto/update-level.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Level } from "./entities/level.entity";
import { Repository } from "typeorm";

@Injectable()
export class LevelService implements OnModuleInit {
  constructor(
    @Inject("LEVEL_REPOSITORY")
    private readonly levelRepository: Repository<Level>
  ) {}

  private logger: Logger = new Logger("LevelService");

  async onModuleInit(): Promise<void> {
    const levels = await this.levelRepository.find();
    if (levels.length === 0) {
      this.logger.log("default level has been created");
      const level1 = {
        name: "Superior",
        about: "00000000000",
      };
      const level2 = {
        name: "Técnico",
        about: "00000000002",
      };
      const sup = this.levelRepository.create(level1);
      await this.levelRepository.save(sup);
      const tec = this.levelRepository.create(level2);
      await this.levelRepository.save(tec);
      return;
    }
    this.logger.log("Dont need to levels. levels.length = " + levels.length);
    return;
  }

  create(createLevelDto: CreateLevelDto) {
    return "This action adds a new level";
  }

  findAll() {
    return `This action returns all level`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}

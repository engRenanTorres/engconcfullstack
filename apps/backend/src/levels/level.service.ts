import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
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
      await this.create(level1);
      await this.create(level2);
      return;
    }
    this.logger.log(
      "Dont need to create default levels. levels.length = " + levels.length
    );
    return;
  }

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const sup = this.levelRepository.create(createLevelDto);
    return await this.levelRepository.save(sup);
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find();
  }

  async findById(id: number): Promise<Level> {
    const level = await this.levelRepository.findOneBy({ id: id });
    if (!level) {
      throw new NotFoundException("concurso not found with id: " + id);
    }
    return level;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}

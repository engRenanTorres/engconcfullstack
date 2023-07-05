import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { StudyArea } from "./entities/study-area.entity";
import { Repository } from "typeorm";
import { MessagesHelper } from "../helpers/message.helper";

@Injectable()
export class StudyAreaService implements OnModuleInit {
  @Inject("STUDY_AREA_REPOSITORY")
  private readonly studyAreasRepository: Repository<StudyArea>;

  private logger: Logger = new Logger("StudyAreaService");

  async onModuleInit(): Promise<void> {
    const users = await this.studyAreasRepository.find();
    if (users.length === 0) {
      this.logger.log("adm user has been created");
      const adm: CreateStudyAreaDto = {
        name: "Engenharia Civil",
        about: "Área especializada na construção civil",
      };
      const normal: CreateStudyAreaDto = {
        name: "Engenharia de Segurança do Trabalho",
        about: "Área especializada na segurança, saúde e qualidade do trabalhador industrial.",
      };
      await this.create(adm);
      await this.create(normal);
      return;
    }
    this.logger.log(
      "Dont need to create default study areas. studyarea.length = " +
        users.length
    );
    return;
  }

  async create(createStudyAreaDto: CreateStudyAreaDto) {
    const studyArea = this.studyAreasRepository.create(createStudyAreaDto);
    return await this.studyAreasRepository.save(studyArea);
  }

  async findAll() {
    return await this.studyAreasRepository.find({ relations: ["subjects"] });
  }

  async findOne(id: number) {
    const studyArea = await this.studyAreasRepository.findOne({
      where: { id },
      relations: ["subjects"],
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return studyArea;
  }

  async findOneByName(name: string) {
    return await this.studyAreasRepository.findOneBy({ name });
  }
  async findById(id: number): Promise<StudyArea> {
    const studyArea = await this.studyAreasRepository.findOneBy({ id: id });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return studyArea;
  }

  async update(id: number, updateStudyAreaDto: UpdateStudyAreaDto) {
    const studyArea = await this.studyAreasRepository.preload({
      id,
      ...updateStudyAreaDto,
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.studyAreasRepository.save(studyArea);
  }

  async remove(id: number) {
    const studyArea = await this.studyAreasRepository.findOne({
      where: { id },
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.studyAreasRepository.remove(studyArea);
  }
}

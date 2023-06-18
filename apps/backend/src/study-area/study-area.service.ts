import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { StudyArea } from "./entities/study-area.entity";
import { Repository } from "typeorm";
import { MessagesHelper } from "../helpers/message.helper";

@Injectable()
export class StudyAreaService {
  @Inject("STUDY_AREA_REPOSITORY")
  private readonly studyAreasRepository: Repository<StudyArea>;

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
  async findById(id: number) {
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
    const studyArea = await this.studyAreasRepository.findOne({ where: {id }});
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.studyAreasRepository.remove(studyArea);
  }
}

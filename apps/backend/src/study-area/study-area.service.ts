import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { StudyArea } from "./entities/study-area.entity";
import { Repository } from "typeorm";
import { MessagesHelper } from "../helpers/message.helper";

@Injectable()
export class StudyAreaService {
  @Inject("STUDY-AREA_REPOSITORY")
  private readonly studyAreaResposity: Repository<StudyArea>;

  async create(createStudyAreaDto: CreateStudyAreaDto) {
    const studyArea = this.studyAreaResposity.create(createStudyAreaDto);
    return await this.studyAreaResposity.save(studyArea);
  }

  async findAll() {
    return await this.studyAreaResposity.find({ relations: ["subjects"] });
  }

  async findOne(id: number) {
    const studyArea = await this.studyAreaResposity.findOne({
      where: { id },
      relations: ["subjects"],
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return studyArea;
  }

  async findOneByName(name: string) {
    return await this.studyAreaResposity.findOneBy({ name });
  }

  async update(id: number, updateStudyAreaDto: UpdateStudyAreaDto) {
    const studyArea = await this.studyAreaResposity.preload({
      id,
      ...updateStudyAreaDto,
    });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.studyAreaResposity.save(studyArea);
  }

  async remove(id: number) {
    const studyArea = await this.studyAreaResposity.findOneBy({ id });
    if (!studyArea) {
      throw new NotFoundException(MessagesHelper.ST_AREA_NOT_FOUND + id);
    }
    return this.studyAreaResposity.remove(studyArea);
  }
}

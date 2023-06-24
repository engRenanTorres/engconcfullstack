import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.entity";
import { Repository } from "typeorm";
import { StudyAreaService } from "../study-area/study-area.service";

@Injectable()
export class SubjectService {
  constructor(
    @Inject("SUBJECT_REPOSITORY")
    private readonly subjectResposity: Repository<Subject>,
    private readonly studyAreaService: StudyAreaService
  ) {}
  private logger: Logger = new Logger("SubjectService");

  async onModuleInit(): Promise<void> {
    const subjects = await this.subjectResposity.find();
    if (subjects.length === 0) {
      const studyArea = await this.studyAreaService.findById(1);
      const studyArea2 = await this.studyAreaService.findById(2);
      const construcao: CreateSubjectDto = {
        name: "Construção Civil",
        about: "Área de obras civis",
        area: studyArea,
      };
      const nr12: CreateSubjectDto = {
        name: "NR12",
        about: "Segurança em Máquinas",
        area: studyArea2,
      };
      this.logger.log("subjects has been created");
      await this.create(construcao);
      await this.create(nr12);
      return;
    }
    this.logger.log(
      "Dont need to create subjects. subjects.length = " + subjects.length
    );
    return;
  }

  async findByAreaId(areaId: number) {
    return this.subjectResposity.find({where: {area: {id: areaId}}, relations: {area: true}});
  }

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectResposity.create(createSubjectDto);
    return await this.subjectResposity.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectResposity.find();
  }

  async findById(id: number): Promise<Subject> {
    const subject = await this.subjectResposity.findOneBy({ id: id });
    if (!subject) {
      throw new NotFoundException("subject not found with id: " + id);
    }
    return subject;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}

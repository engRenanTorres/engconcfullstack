import { Inject, Injectable } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.entity";
import { Repository } from "typeorm";

@Injectable()
export class SubjectService {
  constructor(
    @Inject("SUBJECT_REPOSITORY")
    private readonly subjectResposity: Repository<Subject>
  ) {}
  create(createSubjectDto: CreateSubjectDto) {
    return "This action adds a new subject";
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}

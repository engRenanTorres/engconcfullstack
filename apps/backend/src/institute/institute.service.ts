import { Inject, Injectable } from "@nestjs/common";
import { CreateInstituteDto } from "./dto/create-institute.dto";
import { UpdateInstituteDto } from "./dto/update-institute.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Institute } from "./entities/institute.entity";
import { Repository } from "typeorm";

@Injectable()
export class InstituteService {
  constructor(
    @Inject("INSTITUTE_REPOSITORY")
    private readonly instituteRepository: Repository<Institute>
  ) {}
  create(createInstituteDto: CreateInstituteDto) {
    return "This action adds a new institute";
  }

  findAll() {
    return `This action returns all institute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institute`;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    return `This action removes a #${id} institute`;
  }
}

import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CreateInstituteDto } from "./dto/create-institute.dto";
import { UpdateInstituteDto } from "./dto/update-institute.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Institute } from "./entities/institute.entity";
import { Repository } from "typeorm";

@Injectable()
export class InstituteService implements OnModuleInit {
  constructor(
    @Inject("INSTITUTE_REPOSITORY")
    private readonly instituteRepository: Repository<Institute>
  ) {}

  private logger: Logger = new Logger("InstituteService");

  async onModuleInit(): Promise<void> {
    const institutes = await this.instituteRepository.find();
    if (institutes.length === 0) {
      this.logger.log("default institute has been created");
      const banca1 = {
        name: "FGV",
        about: "00000000000",
        contact: "adm@adm.com",
      };
      const banca2 = {
        name: "Cesgranrio",
        about: "00000000002",
        contact: "normal@normal.com",
      };
      const b1 = this.instituteRepository.create(banca1);
      await this.instituteRepository.save(b1);
      const b2 = this.instituteRepository.create(banca2);
      await this.instituteRepository.save(b2);
      return;
    }
    this.logger.log(
      "Dont need to institues. Institutes.length = " + institutes.length
    );
    return;
  }

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

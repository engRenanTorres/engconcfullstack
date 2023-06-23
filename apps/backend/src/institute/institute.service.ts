import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
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
      await this.create(banca1);
      await this.create(banca2);
      return;
    }
    this.logger.log(
      "Dont need to institues. Institutes.length = " + institutes.length
    );
    return;
  }

  async create(createInstituteDto: CreateInstituteDto) {
    const institute = this.instituteRepository.create(createInstituteDto);
    return await this.instituteRepository.save(institute);
  }

  async findAll() {
    return await this.instituteRepository.find();
  }

  async findById(id: number): Promise<Institute> {
    const user = await this.instituteRepository.findOneBy({ id: id });
    this.checkIfUserExiste(user, id);
    return user;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    return `This action removes a #${id} institute`;
  }
  private checkIfUserExiste(user: object, id: number) {
    if (!user) {
      throw new NotFoundException(`Institute not found by id ${id}`);
    }
  }
}

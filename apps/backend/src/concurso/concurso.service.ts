import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CreateConcursoDto } from "./dto/create-concurso.dto";
import { UpdateConcursoDto } from "./dto/update-concurso.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Concurso } from "./entities/concurso.entity";
import { Repository } from "typeorm";

@Injectable()
export class ConcursoService implements OnModuleInit {
  constructor(
    @Inject("CONCURSO_REPOSITORY")
    private readonly concursoRepository: Repository<Concurso>
  ) {}

  private logger: Logger = new Logger("ConcursoService");

  async onModuleInit(): Promise<void> {
    const concurso = await this.concursoRepository.find();
    if (concurso.length === 0) {
      this.logger.log("default concurso has been created");
      const conc1 = {
        name: "Petrobras",
        about: "Top",
        contact: "adm@adm.com",
      };
      const conc2 = {
        name: "Fundação Saúde do Rio de Janeiro",
        about: "00000000002",
        contact: "normal@normal.com",
      };
      const c1 = this.concursoRepository.create(conc1);
      await this.concursoRepository.save(c1);
      const c2 = this.concursoRepository.create(conc2);
      await this.concursoRepository.save(c2);
      return;
    }
    this.logger.log(
      "Dont need to concuso: concurso.length = " + concurso.length
    );
    return;
  }

  create(createConcursoDto: CreateConcursoDto) {
    return "This action adds a new concurso";
  }

  findAll() {
    return `This action returns all concurso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} concurso`;
  }

  update(id: number, updateConcursoDto: UpdateConcursoDto) {
    return `This action updates a #${id} concurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} concurso`;
  }
}

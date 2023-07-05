import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { CreateConcursoDto } from "./dto/create-concurso.dto";
import { UpdateConcursoDto } from "./dto/update-concurso.dto";
import { Concurso } from "./entities/concurso.entity";
import { Repository } from "typeorm";
import { InstituteService } from "../institute/institute.service";

@Injectable()
export class ConcursoService implements OnModuleInit {
  constructor(
    @Inject("CONCURSO_REPOSITORY")
    private readonly concursoRepository: Repository<Concurso>,
    private readonly instituteService: InstituteService
  ) {}

  private logger: Logger = new Logger("ConcursoService");

  async onModuleInit(): Promise<void> {
    const concurso = await this.concursoRepository.find();
    if (concurso.length === 0) {
      try {
        const institute = await this.instituteService.findById(1);
        const conc1: CreateConcursoDto = {
          name: "Petrobras",
          about: "Top",
          year: 2023,
          institute: institute,
        };
        const conc2: CreateConcursoDto = {
          name: "Fundação Saúde do Rio de Janeiro",
          about: "00000000002",
          year: 2022,
          institute: institute,
        };

          await this.create(conc1);
          await this.create(conc2);
      } catch (e){
        this.logger.error('Error to creace default concursos');
      }
      this.logger.log("default concurso has been created");
      return;
    }
    this.logger.log(
      "Dont need to create default concusos: concurso.length = " +
        concurso.length
    );
    return;
  }

  async create(createConcursoDto: CreateConcursoDto) {
    const concurso = this.concursoRepository.create(createConcursoDto);
    return await this.concursoRepository.save(concurso);
  }

  async findAll(): Promise<Concurso[]> {
    return await this.concursoRepository.find();
  }

  async findById(id: number): Promise<Concurso> {
    const concurso = await this.concursoRepository.findOneBy({ id: id });
    if (!concurso) {
      throw new NotFoundException("concurso not found with id: " + id);
    }
    return concurso;
  }

  update(id: number, updateConcursoDto: UpdateConcursoDto) {
    return `This action updates a #${id} concurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} concurso`;
  }
}

import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Answer, Question } from "./entities/question.entity";
import { Repository } from "typeorm";
import { LevelService } from "../levels/level.service";
import { ConcursoService } from "../concurso/concurso.service";
import { StudyAreaService } from "../study-area/study-area.service";
import { SubjectService } from "../subject/subject.service";
import { QuestionsChoice } from "./entities/questions-choice.entity";
import { UsersService } from "../users/users.service";
import extractAuthUser from "../helpers/get-auth-user.helper";

@Injectable()
export class QuestionService {
  constructor(
    @Inject("QUESTION_REPOSITORY")
    private readonly questionRepository: Repository<Question>,
    private readonly levelService: LevelService,
    private readonly concursoService: ConcursoService,
    private readonly subjectService: SubjectService,
    private readonly userService: UsersService
  ) {}

  private logger: Logger = new Logger("QuestionService");

  async create(
    createQuestionDto: CreateQuestionDto,
    authorization: string
  ): Promise<Question> {
    const user = await extractAuthUser(authorization, this.userService);
    const level = await this.levelService.findById(createQuestionDto.levelId);
    const concurso = await this.concursoService.findById(
      createQuestionDto.concursoId
    );
    const subject = await this.subjectService.findById(
      createQuestionDto.subjectId
    );
    const creator = await this.userService.findById(user.id);
    const question = new Question(
      createQuestionDto.question,
      createQuestionDto.answer,
      createQuestionDto.tip,
      level,
      subject,
      createQuestionDto.questionsChoices as QuestionsChoice[],
      concurso,
      creator
    );
    const newQuestion = this.questionRepository.create(question);
    return await this.questionRepository.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getQtdTotalQuestions(): Promise<number> {
    return await this.questionRepository.createQueryBuilder('question').select().getCount();
  }

  async findAllByAreaId(areaId: number): Promise<Question[]> {
    return await this.questionRepository.find({where: {subject: {area: {id: areaId}}  }});
  }

  async findQuestionsWithKeyword(keyword: string): Promise<Question[]> {
    const query = this.questionRepository.createQueryBuilder("question");
    query.leftJoinAndSelect("question.subject","subject");
    query.leftJoinAndSelect("question.createdBy","createdBy");
    query.leftJoinAndSelect("question.concurso","concurso");
    query.where("question.question LIKE :keyword", { keyword: `%${keyword}%` });
    query.orWhere("subject.name LIKE :keyword", { keyword: `%${keyword}%` });
    query.orWhere("concurso.name LIKE :keyword", { keyword: `%${keyword}%` });

    return await query.getMany();
  }
  async getCountAllPerArea(area: number): Promise<number> {
    const query = this.questionRepository.createQueryBuilder("question");
    query.leftJoinAndSelect("question.subject","subject");
    query.leftJoinAndSelect("subject.area","area");
    query.where("area.id LIKE :area", { area: `%${area}%` });

    return await query.getCount();
  }

  async findAllPageable(
    page: number = 1,
    limit: number = 10
  ) {
    const questionsLength = await this.questionRepository.count();
    const selectedQuestions = [
      ...await this.questionRepository.find({
      take: limit,
      skip: (page) * limit,
    })];
    return {nextPage: (page) * limit < questionsLength ? ++page : null,
      questions: selectedQuestions};
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
    authorization: string
  ) {
    const user = await extractAuthUser(authorization, this.userService);
    const level = await this.levelService.findById(updateQuestionDto.levelId);
    const concurso = await this.concursoService.findById(
      updateQuestionDto.concursoId
    );
    const subject = await this.subjectService.findById(
      updateQuestionDto.subjectId
    );
    const question = new Question(
      updateQuestionDto.question,
      updateQuestionDto.answer,
      updateQuestionDto.tip,
      level,
      subject,
      updateQuestionDto.questionsChoices as QuestionsChoice[],
      concurso,
      null,
      user
    );
    const updatedQuestion = await this.questionRepository.preload({
      id: id,
      ...question,
    });
    return await this.questionRepository.save(updatedQuestion);
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
    });
    this.checkIfUserExiste(question, String(question?.id));
    return await this.questionRepository.remove(question);
  }

  private checkIfUserExiste(question: object, id: string) {
    if (!question) {
      throw new NotFoundException(`Question not found by id ${id}`);
    }
  }
}

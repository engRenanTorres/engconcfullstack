import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Answer, Question } from "./entities/question.entity";
import { Repository } from "typeorm";

@Injectable()
export class LevelService implements OnModuleInit {
  constructor(
    @Inject("QUESTION_REPOSITORY")
    private readonly questionRepository: Repository<Question>
  ) {}

  private logger: Logger = new Logger("LevelService");

  async onModuleInit(): Promise<void> {
    const questions = await this.questionRepository.find();
    if (questions.length === 0) {
      this.logger.log("default level has been created");
      const level1 = {
        id: 1,
        question: "Seria eu renan?",
        answer: Answer.V,
        tip: "questao muito facil",
        questionsChoices: [
          { id: 1, choice: "A) Certo" },
          { id: 2, choice: "B) Errado" },
        ],
      } as Question;
      const level2 = {
        id: 2,
        question: "Quem é o cara mais legal?",
        tip: "questao obvia.",
        answer: Answer.A,
        questionsChoices: [
          { choice: "A) Renan" },
          { choice: "B) Guerra" },
          { choice: "C) Guerra" },
          { choice: "D) Peçanha" },
          { choice: "E) Noira" },
        ],
      } as Question;
      const question = this.questionRepository.create(level1);
      const question2 = this.questionRepository.create(level2);
      await this.questionRepository.save(question);
      await this.questionRepository.save(question2);
      return;
    }
    this.logger.log(
      "Dont need to create quesitons. questions.length = " + questions.length
    );
    return;
  }

  create(createLevelDto: CreateQuestionDto) {
    return "This action adds a new level";
  }

  findAll() {
    return `This action returns all level`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateQuestionDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}

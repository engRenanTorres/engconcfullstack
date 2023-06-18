import { Test, TestingModule } from "@nestjs/testing";
import { QuestionController } from "./question.controller";
import { LevelService } from "./question.service";

describe("QuestionController", () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [LevelService],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

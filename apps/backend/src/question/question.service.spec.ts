import { Test, TestingModule } from "@nestjs/testing";
import { LevelService as LevelService } from "./question.service";

describe("QuestionService", () => {
  let service: LevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelService],
    }).compile();

    service = module.get<LevelService>(LevelService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

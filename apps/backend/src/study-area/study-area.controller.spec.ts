import { Test, TestingModule } from "@nestjs/testing";
import { StudyAreaController } from "./study-area.controller";
import { StudyAreaService } from "./study-area.service";

describe("StudyAreaController", () => {
  let controller: StudyAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyAreaController],
      providers: [StudyAreaService],
    }).compile();

    controller = module.get<StudyAreaController>(StudyAreaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

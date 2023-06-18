import { Test, TestingModule } from "@nestjs/testing";
import { ConcursoController } from "./concurso.controller";
import { ConcursoService } from "./concurso.service";

describe("ConcursoController", () => {
  let controller: ConcursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcursoController],
      providers: [ConcursoService],
    }).compile();

    controller = module.get<ConcursoController>(ConcursoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

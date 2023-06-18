import { Test, TestingModule } from "@nestjs/testing";
import { ConcursoService } from "./concurso.service";

describe("ConcursoService", () => {
  let service: ConcursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcursoService],
    }).compile();

    service = module.get<ConcursoService>(ConcursoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

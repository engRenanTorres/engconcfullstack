import { Test, TestingModule } from "@nestjs/testing";
import { StudyAreaService } from "./study-area.service";

describe("StudyAreaService", () => {
  let service: StudyAreaService;

  beforeEach(async () => {
    service = new StudyAreaService();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { Subject } from "./entities/subject.entity";
import { StudyAreaService } from "../study-area/study-area.service";
import { StudyArea } from "../study-area/entities/study-area.entity";

describe("SubjectController", () => {
  let service: SubjectService;
  let areaService: StudyAreaService;
  let controller: SubjectController;
  let normalSubject: Subject;
  let areaTest: StudyArea;

  beforeEach(async () => {
    areaService= new StudyAreaService();
    service = new SubjectService(areaService);
    controller = new SubjectController(service);

  });

  beforeAll(() => {
    areaTest = {
      id: 1,
      name: 'eng civil',
      about: 'construction',
      subjects: [],
    }

    normalSubject = {
      id: 1,
      questions: [],
      name: "Usuario Teste",
      about: "Materia Legal",
      area: areaTest,
    };
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of subject", async () => {
      jest
        .spyOn(service, "findAll")
        .mockImplementation(() => Promise.resolve([normalSubject]));

      expect(await controller.findAll()).toStrictEqual([normalSubject]);
    });
  });

  describe("findById", () => {
    it("should return a subject", async () => {
      jest
        .spyOn(service, "findById")
        .mockImplementation(() => Promise.resolve(normalSubject));

      expect(await controller.findOne(normalSubject.id.toString())).toBe(normalSubject);
    });
  });
  describe("create", () => {
    it("should return a subject", async () => {
      jest
        .spyOn(service, "create")
        .mockImplementation(() => Promise.resolve(normalSubject));

      expect(await controller.create(normalSubject)).toBe(normalSubject);
    });
  });
  /*describe("update", () => {
    it("should return a subject", async () => {
      jest
        .spyOn(service, "update")
        .mockImplementation(() => Promise.resolve(normalSubject));

      expect(await controller.update(String(normalSubject.id), normalSubject)).toBe(
        normalSubject
      );
    });
  });*/
});

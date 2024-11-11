import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { NotFoundException } from "@nestjs/common";
import { DataBaseError } from "../common/errors/types/DatabaseError";
import { StudyAreaService } from "../study-area/study-area.service";
import { StudyArea } from "../study-area/entities/study-area.entity";

describe("SubjectsService", () => {
  let service: SubjectService;
  let areaService: StudyAreaService;
  let id: number;
  let expectOutputSubject: CreateSubjectDto;
  let createSubjectDTO: CreateSubjectDto;
  let areaTest: StudyArea;

  beforeEach(async () => {
    areaService= new StudyAreaService();
    service = new SubjectService(areaService);
    id = 1;
  });

  beforeAll(() => {
    areaTest = {
      id: 1,
      name: 'eng civil',
      about: 'construction',
      subjects: [],
    }

    expectOutputSubject = {
      name: "Usuario Teste",
      about: "Materia Legal",
      area: areaTest,
    };

    createSubjectDTO = expectOutputSubject;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create method", () => {
    it("should create a subject", async () => {
      const mockSubjectRepository = {
        create: () => jest.fn().mockReturnValue(Promise.resolve(createSubjectDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(createSubjectDTO)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      const newSubject = await service.create(createSubjectDTO);

      expect(mockSubjectRepository.save).toHaveBeenCalled();
      expect(newSubject).toMatchObject(expectOutputSubject);
    });
    it("should throw a database error if there is an error saving the subject", async () => {
      const mockSubjectRepository = {
        create: (createSubjectDTO: CreateSubjectDto) =>
          jest.fn().mockReturnValue(createSubjectDTO),
        save: jest.fn().mockRejectedValue(new DataBaseError("erro", "254")),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      await expect(service.create(createSubjectDTO)).rejects.toThrow(
        DataBaseError
      );
    });
  });
  describe.skip("Updating subject", () => {
    it("should call save subject after update", async () => {
      const updateeSubjectDTO: UpdateSubjectDto = {
        name: "Materia Teste",
        about: "12345678912",
        area: areaTest,
      };
      const mockSubjectRepository = {
        update: () =>
          jest.fn().mockReturnValue(Promise.resolve(updateeSubjectDTO)),
        preload: jest.fn().mockReturnValue(Promise.resolve(updateeSubjectDTO)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(updateeSubjectDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(updateeSubjectDTO)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      const subject = await service.update(1, updateeSubjectDTO);

      expect(mockSubjectRepository.save).toHaveBeenCalled();
      expect(subject).toMatchObject(expectOutputSubject);
    });
    it("should throw a notFoundExeption when dont exists subject with the selected id", async () => {
      const updateeSubjectDTO: UpdateSubjectDto = {
        name: "Materia Teste",
        about: "Material Legal",
        area: areaTest,
      };
      const mockSubjectRepository = {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
        preload: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
        save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;

      async function update() {
        await service.update(id, updateeSubjectDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockSubjectRepository.preload).toHaveBeenCalled();
      expect(mockSubjectRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("Finding subject", () => {
    it("should list all subject", async () => {
      const expectOutputSubjects = [
        {
          name: "Materia Teste",
          about: 'Materia legal'
        },
      ];
      const mockSubjectRepository = {
        findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubjects)),
        find: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubjects)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      const subject = await service.findAll();
      expect(mockSubjectRepository.find).toHaveBeenCalled();
      expect(expectOutputSubjects).toStrictEqual(subject);
    });
    it("should get one subject when fetching by id", async () => {
      const id = 1;
      const expectOutputSubject = [
        {
          id: 1,
          name: "Materia Teste",
          about: "Materia Legal",
        },
      ];
      const mockSubjectRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubject)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubject)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      const subject = await service.findById(id);
      expect(mockSubjectRepository.findOneBy).toHaveBeenCalled();
      expect(expectOutputSubject).toStrictEqual(subject);
    });
    it("should throw a notFoundExeption when trying to find a subject by id that not exists", async () => {
      const id = 1;

      const mockSubjectRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;

      async function findbyId() {
        await service.findById(id);
      }

      await expect(findbyId()).rejects.toThrow(NotFoundException);
      expect(mockSubjectRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe.skip("Removing subject", () => {
    it("should remove one subject", async () => {
      const email = "usuario@teste.com";
      const expectOutputSubject = [
        {
          id: 1,
          name: "Usuario Teste",
          about: "Material Legal",
        },
      ];
      const mockSubjectRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubject)),
        remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputSubject)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;
      const subject = await service.remove(id);
      expect(mockSubjectRepository.remove).toHaveBeenCalled();
      expect(expectOutputSubject).toStrictEqual(subject);
    });
    it("should throw a notFoundExeption when trying to remove a subject that not exists", async () => {
      const email = "myemail";

      const mockSubjectRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        remove: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["subjectRepository"] = mockSubjectRepository;

      async function removeById() {
        await service.remove(id);
      }

      await expect(removeById()).rejects.toThrow(NotFoundException);
      expect(mockSubjectRepository.remove).not.toHaveBeenCalled();
    });
  });
});

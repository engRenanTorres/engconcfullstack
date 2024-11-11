import { StudyAreaService } from "./study-area.service";
import { CreateStudyAreaDto } from "./dto/create-study-area.dto";
import { DataBaseError } from "../common/errors/types/DatabaseError";
import { UpdateStudyAreaDto } from "./dto/update-study-area.dto";
import { NotFoundException } from "@nestjs/common";

describe("StudyAreaService", () => {
  let service: StudyAreaService;
  let id: number;
  let expectOutput: CreateStudyAreaDto;
  let createStudyAreaDTO: CreateStudyAreaDto;

  beforeEach(async () => {
    service = new StudyAreaService();
    id = 1;
    expectOutput = {
      name: "Area Teste",
      about: "12345678912",
    };

    createStudyAreaDTO = expectOutput;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create method", () => {
    it("should create a study area", async () => {
      const mockStudyAreaRepository = {
        create: () =>
          jest.fn().mockReturnValue(Promise.resolve(createStudyAreaDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(createStudyAreaDTO)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;

      const newStudyArea = await service.create(createStudyAreaDTO);

      expect(mockStudyAreaRepository.save).toHaveBeenCalled();
      expect(newStudyArea).toMatchObject(expectOutput);
    });
    it("should throw a database error if there is an error saving the study area", async () => {
      const mockStudyAreaRepository = {
        create: (createStudyAreaDTO: CreateStudyAreaDto) =>
          jest.fn().mockReturnValue(createStudyAreaDTO),
        save: jest.fn().mockRejectedValue(new DataBaseError("erro", "254")),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;

      await expect(service.create(createStudyAreaDTO)).rejects.toThrow(
        DataBaseError
      );
    });
  });

  describe("Updating study area", () => {
    it("should call save study area after update", async () => {
      const updateStudyAreaDTO: UpdateStudyAreaDto = {
        name: "Area Teste",
        about: "12345678912",
      };
      const mockStudyAreaRepository = {
        update: () =>
          jest.fn().mockReturnValue(Promise.resolve(updateStudyAreaDTO)),
        preload: jest.fn().mockReturnValue(Promise.resolve(updateStudyAreaDTO)),
        findOneBy: jest
          .fn()
          .mockReturnValue(Promise.resolve(updateStudyAreaDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(updateStudyAreaDTO)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;
      const studyArea = await service.update(id, updateStudyAreaDTO);

      expect(mockStudyAreaRepository.save).toHaveBeenCalled();
      expect(studyArea).toMatchObject(expectOutput);
    });
    it("should throw a notFoundExeption when dont exists study area with the selected id", async () => {
      const updateeStudyAreaDTO: UpdateStudyAreaDto = {
        name: "Usuario Teste",
        about: "usuario@teste.com",
      };
      const mockStudyAreaRepository = {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
        preload: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
        save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;

      async function update() {
        await service.update(id, updateeStudyAreaDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockStudyAreaRepository.preload).toHaveBeenCalled();
      expect(mockStudyAreaRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("Finding study areas", () => {
    it("should list all studyAreas", async () => {
      const expectOutputStudyAreas = [
        {
          name: "Usuario Teste",
          about: "123",
        },
      ];
      const mockStudyAreaRepository = {
        findAll: jest
          .fn()
          .mockReturnValue(Promise.resolve(expectOutputStudyAreas)),
        find: jest
          .fn()
          .mockReturnValue(Promise.resolve(expectOutputStudyAreas)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;
      const studyAreas = await service.findAll();
      expect(mockStudyAreaRepository.find).toHaveBeenCalled();
      expect(expectOutputStudyAreas).toEqual(studyAreas);
    });
    it("should get one study area when fetching by id", async () => {
      const id = 1;
      const mockStudyAreaRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(expectOutput)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(expectOutput)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;
      const studyArea = await service.findById(id);
      expect(mockStudyAreaRepository.findOneBy).toHaveBeenCalled();
      expect(expectOutput).toStrictEqual(studyArea);
    });
    it("should throw a notFoundExeption when trying to find a studyArea by id that not exists", async () => {
      const id = 1;

      const mockStudyAreaRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;

      async function findbyId() {
        await service.findById(id);
      }

      await expect(findbyId()).rejects.toThrow(NotFoundException);
      expect(mockStudyAreaRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe("Removing study areas", () => {
    it("should remove one study area", async () => {
      const mockStudyAreaRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutput)),
        remove: jest.fn().mockReturnValue(Promise.resolve(expectOutput)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;
      const studyArea = await service.remove(id);
      expect(mockStudyAreaRepository.remove).toHaveBeenCalled();
      expect(expectOutput).toStrictEqual(studyArea);
    });
    it("should throw a notFoundExeption when trying to remove a study area that not exists", async () => {
      const email = "myemail";

      const mockStudyAreaRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        remove: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["studyAreasRepository"] = mockStudyAreaRepository;

      async function removeById() {
        await service.remove(id);
      }

      await expect(removeById()).rejects.toThrow(NotFoundException);
      expect(mockStudyAreaRepository.remove).not.toHaveBeenCalled();
    });
  });
});

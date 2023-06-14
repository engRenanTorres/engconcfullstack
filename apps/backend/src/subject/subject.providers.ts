import { DataSource } from "typeorm";
import { Subject } from "./entities/subject.entity";

export const subjectProviders = [
  {
    provide: "SUBJECT_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subject),
    inject: ["DATA_SOURCE"],
  },
];

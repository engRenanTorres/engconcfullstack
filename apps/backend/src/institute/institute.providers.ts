import { DataSource } from "typeorm";
import { Institute } from "./entities/institute.entity";

export const instituteProviders = [
  {
    provide: "INSTITUTE_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Institute),
    inject: ["DATA_SOURCE"],
  },
];

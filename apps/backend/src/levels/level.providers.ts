import { DataSource } from "typeorm";
import { Level } from "./entities/level.entity";

export const levelProviders = [
  {
    provide: "LEVEL_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Level),
    inject: ["DATA_SOURCE"],
  },
];

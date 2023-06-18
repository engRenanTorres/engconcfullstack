import { DataSource } from "typeorm";
import { Concurso } from "./entities/concurso.entity";

export const concursoProviders = [
  {
    provide: "CONCURSO_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Concurso),
    inject: ["DATA_SOURCE"],
  },
];

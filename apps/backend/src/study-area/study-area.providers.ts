import { DataSource } from "typeorm";
import { StudyArea } from "./entities/study-area.entity";

export const studyAreaProviders = [
  {
    provide: "STUDY_AREA_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudyArea),
    inject: ["DATA_SOURCE"],
  },
];

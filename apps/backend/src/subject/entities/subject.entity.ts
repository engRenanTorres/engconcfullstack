import { StudyArea } from "../../study-area/entities/study-area.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @Column({})
  questions: number;
  @ManyToOne((type) => StudyArea, (study) => study.subjects, { cascade: true })
  area: StudyArea;
}

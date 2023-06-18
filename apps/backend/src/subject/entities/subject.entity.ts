import { Question } from "../../question/entities/question.entity";
import { StudyArea } from "../../study-area/entities/study-area.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @ManyToOne(() => StudyArea, (study) => study.subjects, { eager: true })
  area: StudyArea;
  @OneToMany(() => Question, (question) => question.subject)
  questions: Question[];
}

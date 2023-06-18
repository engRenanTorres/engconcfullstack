import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Institute } from "../../institute/entities/institute.entity";
import { Question } from "../../question/entities/question.entity";

@Entity("concurso")
export class Concurso {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @Column({ type: "int" })
  year: number;
  @ManyToOne(() => Institute, (institute) => institute.concursos, {
    eager: true,
  })
  institute: Institute;
  @OneToMany(() => Question, (question) => question.concurso)
  questions: Question[];

  @BeforeInsert()
  maxYear() {
    if (this.year > new Date().getFullYear()) {
      this.year = new Date().getFullYear();
    }
  }
}

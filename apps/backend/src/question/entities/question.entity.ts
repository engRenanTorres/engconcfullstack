import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionsChoice } from "./questions-choice.entity";
import { Concurso } from "../../concurso/entities/concurso.entity";
import { Level } from "../../levels/entities/level.entity";
import { Subject } from "../../subject/entities/subject.entity";

export enum Answer {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  V = "V",
  F = "F",
}

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  question: string;
  @Column({ type: "enum", enum: Answer, nullable: false })
  answer: Answer;
  @Column({ type: "text", nullable: true, default: null })
  tip: string;
  @ManyToOne(() => Level, (level) => level.questions, { eager: true })
  level: Level;
  @ManyToOne(() => Subject, (subject) => subject.questions, { eager: true })
  subject: Subject;
  @OneToMany(() => QuestionsChoice, (choices) => choices.question, {
    cascade: true,
    eager: true,
  })
  questionsChoices: QuestionsChoice[];
  @ManyToOne(() => Concurso, (concurso) => concurso.questions, { eager: true })
  concurso: Concurso;
}

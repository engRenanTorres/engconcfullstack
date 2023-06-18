import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/entities/question.entity";

@Entity("levels")
export class Level {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @OneToMany(() => Question, (question) => question.level)
  questions: Question[];
}

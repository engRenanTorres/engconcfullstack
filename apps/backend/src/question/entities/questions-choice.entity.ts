import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity("questions_choice")
export class QuestionsChoice {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Question, (question) => question.questionsChoices)
  question: Question;
  @Column({ type: "text", nullable: false })
  choice: string;
}

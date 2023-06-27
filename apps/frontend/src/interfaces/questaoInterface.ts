import Concurso from './concursoInterface';
import Level from './levelInterface';
import Subject from './subjectInterface';
import { User } from './userInterface';

export interface Question {
  id: number;
  concurso: Concurso;
  level: Level;
  subject: Subject;
  question: string;
  answer: 'A' | 'B' | 'C' | 'D' | 'E' | 'V' | 'F';
  tip: string;
  createdBy: User;
  createdAt: Date;
  lastUpdateBy: User;
  lastUpdateAt: Date;
}

import StudyArea from './studyAreaInterface';

export default interface Subject {
  id: number;
  name: string;
  about: string;
  area: StudyArea;
}

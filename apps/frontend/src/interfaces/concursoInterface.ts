import Institute from './instituteInterface';

export default interface Concurso {
  id: number;
  name: string;
  about: string;
  year: number;
  institute: Institute;
}

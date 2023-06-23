import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Concurso } from "../../concurso/entities/concurso.entity";

@Entity("institute")
export class Institute {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  name: string;
  @Column({ nullable: true, default: null })
  about: string;
  @Column()
  contact: string;
  @OneToMany(() => Concurso, (concurso) => concurso.institute)
  concursos: Concurso[];
}

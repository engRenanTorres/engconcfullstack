import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("banca")
export class Institute {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;
  @Column()
  about: string;
  @Column()
  contact: string;
}

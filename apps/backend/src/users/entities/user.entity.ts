import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from "bcrypt";
import { Role } from "./role.enum";
import { Question } from "../../question/entities/question.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: `name`, nullable: false })
  name: string;
  @Column({ name: `cnpj`, nullable: false, unique: true })
  cnpj: string;
  @Column({ name: `email`, nullable: false, unique: true })
  email: string;
  @Column({ name: "password", nullable: true })
  password: string;
  @Column({
    name: "roles",
    type: "enum",
    enum: Role,
    nullable: true,
    default: 3,
  })
  roles: Role;

  @OneToMany(()=> Question, (question) => question.createdBy)
  insertedQuestions: Question[];
  @OneToMany(()=> Question, (question) => question.lastUpdateAt)
  updatedQuestions: Question[];

  constructor(user: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.roles = user?.roles;
    this.password = user?.password;
  }

  @BeforeInsert()
  hasPassword() {
    this.password = hashSync(this.password, 10);
  }
}

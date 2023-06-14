import { MigrationInterface, QueryRunner } from "typeorm";

//npx typeorm migration:create src/migrations/CreateTable   ***criação***

export class CreateTable1673218477897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE `engenharia-de-concursos`");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
//Para rodar:
// 1- Inserir nome da classe no item migrations no segundo objeto dentro de database.providers.ts
// 2- Precisa gerar a build para rodar  ***npm run build***
// 3- npx typeorm migration:run -d dist/database.providers.js

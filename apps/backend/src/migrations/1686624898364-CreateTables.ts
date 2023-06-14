import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTables1686624898364 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'study_areas',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'about',
                type: 'varchar',
            },
        ],
    }), true);

    await queryRunner.createTable(new Table({
        name: 'subjects',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar',
                length: '50',
            },
            {
                name: 'questions',
                type: 'int',
            },
            {
                name: 'areaId',
                type: 'int',
            },
        ],
    }), true);

    await queryRunner.createForeignKey('subjects', new TableForeignKey({
        columnNames: ['areaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'study_areas',
        onDelete: 'CASCADE',
    }));
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('subjects', 'study_areas_areaId');
    await queryRunner.dropTable('subjects');
    await queryRunner.dropTable('study_areas');
}
}

//npx typeorm migration:create src/migrations/CreateTable   ***criação***

//Para rodar:
// 1- Inserir nome da classe no item migrations no segundo objeto dentro de database.providers.ts
// 2- Precisa gerar a build para rodar  ***npm run build***
// 3- npx typeorm migration:run -d dist/database.providers.js

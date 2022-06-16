import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDoctor1655337910478 implements MigrationInterface {
  name = 'createDoctor1655337910478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`doctor_specialization\` (\`id\` varchar(36) NOT NULL, \`specialization\` enum ('ALERGOLOGIA', 'ANGIOLOGIA', 'BUCO_MAXILO', 'CARDIOLOGIA_CLÍNICA', 'CARDIOLOGIA_INFANTIL', 'CIRURGIA_CABEÇA_PESCOÇO', 'CIRURGIA_CARDÍACA', 'CIRURGIA_TÓRAX') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctors\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`crm\` varchar(255) NOT NULL, \`landline_number\` int NOT NULL, \`mobile_number\` int NOT NULL, \`zipcode\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`complement\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_d7e8212b37dd4e61e996d7289c\` (\`crm\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor_specialization\` ADD CONSTRAINT \`FK_13dbaa851df3ea056dd6e915066\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`doctor_specialization\` DROP FOREIGN KEY \`FK_13dbaa851df3ea056dd6e915066\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d7e8212b37dd4e61e996d7289c\` ON \`doctors\``,
    );
    await queryRunner.query(`DROP TABLE \`doctors\``);
    await queryRunner.query(`DROP TABLE \`doctor_specialization\``);
  }
}

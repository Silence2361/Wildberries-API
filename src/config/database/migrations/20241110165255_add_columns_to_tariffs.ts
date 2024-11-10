import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('tariffs', (table) => {
    table.string('boxDeliveryAndStorageExpr').nullable();
    table.string('boxDeliveryBase').nullable();
    table.string('boxDeliveryLiter').nullable();
    table.string('boxStorageBase').nullable();
    table.string('boxStorageLiter').nullable();
    table.string('warehouseName').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('tariffs', (table) => {
    table.dropColumn('boxDeliveryAndStorageExpr');
    table.dropColumn('boxDeliveryBase');
    table.dropColumn('boxDeliveryLiter');
    table.dropColumn('boxStorageBase');
    table.dropColumn('boxStorageLiter');
    table.dropColumn('warehouseName');
  });
}

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.integer('warehouse_id').notNullable();
    table.decimal('coefficient', 5, 2).notNullable();
    table.timestamp('last_updated').defaultTo(knex.fn.now());
    table.unique(['date', 'warehouse_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tariffs');
}

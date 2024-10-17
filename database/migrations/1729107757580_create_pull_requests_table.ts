import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pull_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('url')
      table.string('repository_name')
      table.string('description')
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
      table.integer('language_id').unsigned().references('languages.id').onDelete('cascade')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

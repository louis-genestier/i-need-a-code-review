import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import PullRequest from '#models/pull_request'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare displayName: string

  @column()
  declare color: string

  @hasMany(() => PullRequest)
  declare pullRequests: HasMany<typeof PullRequest>

  @column()
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, beforeSave, afterFind } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import PullRequest from '#models/pull_request'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import encryption from '@adonisjs/core/services/encryption'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare githubId: string

  @column({ serializeAs: null })
  declare githubAccessToken: string

  @beforeSave()
  static async encryptAccessToken(user: User) {
    if (user.$dirty.githubAccessToken) {
      user.githubAccessToken = await encryption.encrypt(user.githubAccessToken)
    }
  }

  @afterFind()
  static async decryptAccessToken(user: User) {
    user.githubAccessToken = (await encryption.decrypt(user.githubAccessToken)) as string
  }

  @column()
  declare githubUsername: string

  @hasMany(() => PullRequest)
  declare pullRequests: HasMany<typeof PullRequest>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

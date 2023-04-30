import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Shelf extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string

  @belongsTo(()=> User,{ foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

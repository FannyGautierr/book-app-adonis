import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from './User'


export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public book_id: string

  @column()
  public user_id: number

  @belongsTo(()=> User,{ foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

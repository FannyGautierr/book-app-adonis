import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Book from 'App/Models/Book'
import  auth  from '@adonisjs/auth/build/standalone'
import User from 'App/Models/User'




export default class BooksController {
    /*public async add({request,response,auth}){
      const bookSchema = schema.create({
        //user_id: schema.number([rules.exists({ table: 'users', column: 'id' })])
        book_id: schema.string({}, [rules.minLength(1)])
      })
      console.log(bookSchema)
      console.log(request.all())
      const data = await request.validate({ schema: bookSchema })
      console.log(data)
      //const user = await User.findOrFail(request.id)
     
      const book = new Book()
      //await book.related('user_id').attach([user])
      const user = auth.user;
   
      book.merge(data);
      //user.books().save(book);
      await user.books().save(book);

      /*book.merge(data)
*/
     /* await book.save()*/
  /*
      return response.redirect('/dashboard')
    }
*/

public async add({ request, response, auth }) {
  const bookSchema = schema.create({
    book_id: schema.string({}, [rules.minLength(1)])
  
  })
  const data = await request.validate({ schema: bookSchema })
  const book = new Book()
  book.merge(data)
  book.user_id = auth.user.id
  await book.save()
  return response.redirect('/dashboard')
}
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Book from 'App/Models/Book'
import  auth  from '@adonisjs/auth/build/standalone'
import User from 'App/Models/User'




export default class BooksController {

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

public async delete({request,response}){
  console.log(request)
  const id = request.requestBody.book_id
  const book = await Book.findOrFail(id)
  await book.delete()

  return response.redirect('/dashboard')
}
}

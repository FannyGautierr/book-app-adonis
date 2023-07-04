/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import axios from 'axios'
import Book from 'App/Models/Book'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import * as console from 'console'

Route.get('/', async ({ view }) => {
  
  const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NY_API_KEY}`
  const res = await axios.get(url)
  const json = await res.data
  console.log(json)
  const books = json.results.books.map((book) => ({
    title: book.title,
    cover: book.book_image,
    author: book.author,
  }))

  return view.render('welcome', { books })
})
Route.get('register', 'AuthController.registerShow').as('auth.register.show')
Route.get('login', 'AuthController.loginShow').as('auth.login.show')
Route.post('register', 'AuthController.register').as('auth.register')
Route.post('login', 'AuthController.login').as('auth.login')
Route.get('logout', 'AuthController.logout').as('auth.logout')

// CRUD FOR BOOKS
Route.post('add', 'BooksController.add').as('books.add')
Route.post('delete', 'BooksController.delete').as('books.delete')

//CRUD FOR SHELF

Route.post('addShelf', 'ShelvesController.add').as('shelf.add')

Route.get('/dashboard', async ({ view, auth }) => {
  if(auth.user){
    let books = await Book.query().where('user_id', auth.user.id)
    type Book = {
      title: string
      authors: string[]
      id: number
    }
    const bookshelf: Book[] = []
  
    await Promise.all(
      books.map(async (item) => {
        const fetch = require('node-fetch')
        const key = item.book_id
        const url = `https://www.googleapis.com/books/v1/volumes/${key}`
  
        try {
          const res = await fetch(url)
          const json = await res.json()
          const book: Book = {
            title: json.volumeInfo.title,
            authors: json.volumeInfo.authors,
            id: item.id,
          }
          bookshelf.push(book)
        } catch (error) {
          console.error(`Error retrieving book information : ${error}`)
          // handle the error
        }
      })
    )
  
    console.log('this is bookshel :' + bookshelf)
    return view.render('dashboard', { bookshelf })
  }else{
    return view.render('/')

  }
  
})

Route.get('/reco/:category', async ({ view, params }) => {
  const fetch = require('node-fetch')
  const category = params.category
  /*const url = `https://hapi-books.p.rapidapi.com/week/${category}/10`;*/
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=newest&maxResults=20`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c4e3cbb71dmshcc07b5f64bd8f7cp148345jsn37fee828b4ef',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
    },
  }
  try {
    const res = await fetch(url, options)
    const json = await res.json()
    const books = json.map((book) => ({
      title: book.name,
    }))
    return view.render('selection', { books })
  } catch (err) {
    console.error('error:' + err)
  }
})

Route.get('/books/:category', async ({ view, params }) => {
  const fetch = require('node-fetch')
  const category = params.category

  /*const url = `http://openlibrary.org/search.json?q=subject:${category}&limit=30&sort=new&language:eng`;*/
  /*const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=newest&maxResults=20`*/
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&printType=books&minRating=5.0&orderBy=newest&maxResults=20`

  try {
    const res = await fetch(url)
    const json = await res.json()
    console.log(json.items[2].volumeInfo)
    const books = json.items.map((book) => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.author_name ? book.volumeInfo.author_name.join(', ') : '',
      cover: book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '',
      key: book.id,
    }))
    return view.render('book', { books, category })
  } catch (err) {
    console.error('error:' + err)
  }
})

Route.get('book/:key', async ({ view, params }) => {
  const promptMessage =
    'Give a json of the aggregation of ratings and the average of all for the book [name of the book] by [name of the author]. In this format  ["name":"...","author":"..." ,"ratings":[ {"name":"Goodreads","rating": float ,"number_of_reviews": int},  {"name":"Amazon" ,...} ,... ], "averageRating" : .... ]'
  const window = new JSDOM('').window
  DOMPurify(window)
  const fetch = require('node-fetch')
  const key = params.key
  /*const url = `http://openlibrary.org/works/${key}.json?language:eng`;*/
  const url = `https://www.googleapis.com/books/v1/volumes/${key}`

  try {
    const res = await fetch(url)
    const json = await res.json()
    console.log('This is the key book : ' + url)

    const book = {
      title: json.volumeInfo.title,
      description: json.volumeInfo.description,
      covers: json.volumeInfo.imageLinks.thumbnail,
      authors: json.volumeInfo.authors,
      subjects: json.volumeInfo.subjects,
      key: key,
    }
    console.log(book)
    // Use the prompt message to get the user's input
    const prompt = promptMessage
      .replace('[name of the book]', book.title)
      .replace('[name of the author]', book.authors[0])

    console.log(prompt)

    // Make an API request to OpenAI with the prompt and the API key from .env file
    const openaiUrl = 'https://api.openai.com/v1/completions'
    const openaiKey = process.env.OPEN_AI_API_KEY
    /* const openaiPrompt = [
      `Aggregate ratings and reviews for the book ${book.title} by ${book.authors[0]}: ${prompt}`,
    ]*/
    const openaiResponse = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 256,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })
    const openaiJson = await openaiResponse.json()
    const aggregationResult = eval(openaiJson.choices[0].text.trim())

    
    console.log(aggregationResult)

    return view.render('books', { book, aggregationResult })
  } catch (err) {
    console.error('error:' + err)
  }
})

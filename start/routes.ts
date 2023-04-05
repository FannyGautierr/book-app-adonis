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


Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('register', 'AuthController.registerShow').as('auth.register.show')
Route.get('login', 'AuthController.loginShow').as('auth.login.show')
Route.post('register', 'AuthController.register').as('auth.register')
Route.post('login', 'AuthController.login').as('auth.login') 
Route.get('logout','AuthController.logout').as('auth.logout')

Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
})

Route.get('/reco/:category', async ({ view,params }) => {
  const fetch = require('node-fetch');
  const category = params.category
  const url = `https://hapi-books.p.rapidapi.com/week/${category}/10`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c4e3cbb71dmshcc07b5f64bd8f7cp148345jsn37fee828b4ef',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
    }
  };
try{
  const res = await fetch(url, options);
  const json = await res.json();
  console.log(json)
  const books = json.map((book) => ({
    title: book.name,
  }))
    return view.render('selection',{books})
  }catch(err){
    console.error('error:' + err);
  }

})

Route.get('/books/:category', async ({ view, params }) => {
  const fetch = require('node-fetch');
  const category = params.category;

  const url = `http://openlibrary.org/search.json?q=subject:${category}&limit=10`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(json)
    const books = json.docs.map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "",
      cover: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
      key : book.key.substring(6)
    }));
    console.log(books)
    return view.render('book', { books, category });
  } catch (err) {
    console.error('error:' + err);
  }
});

Route.get('book/:key',async ({view,params})=>{
  const fetch = require('node-fetch');
  const key = params.key;
  const url = `http://openlibrary.org/works/${key}.json`;
  console.log(url)
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(json)
    const book = { 
       title: json.title ,
       description : json.description ,
       covers : `http://covers.openlibrary.org/b/id/${json.covers[0]}-M.jpg`,
        authors : json.authors,
        subjects : json.subjects,
      };
    console.log(book.authors)
    return view.render('books', { book });
  }catch (err){
    console.error('error:' + err);
  }
})




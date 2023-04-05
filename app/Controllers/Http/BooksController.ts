import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';



export default class BooksController {

    public async book({ view }: HttpContextContract) {


        const options = {
          method: 'GET',
          url: 'https://hapi-books.p.rapidapi.com/week/biography/50',
          headers: {
            'X-RapidAPI-Key': 'c4e3cbb71dmshcc07b5f64bd8f7cp148345jsn37fee828b4ef',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data);
            return response.data
        }).catch(function (error) {
            console.error(error);
        });
     
    
      }

}

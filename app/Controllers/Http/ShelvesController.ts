// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Shelf from "App/Models/Shelf"

export default class ShelvesController {
    public async add({ request, response, auth }) {
      
    
        const shelf = new Shelf()
        shelf.merge(data)
        shelf.user_id = auth.user.id
        await shelf.save()
        return response.redirect('/dashboard')
      }
    
}

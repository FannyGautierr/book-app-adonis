import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async registerShow({ view }: HttpContextContract) {
        return view.render('auth/register')
      }
      public async loginShow({ view }: HttpContextContract) {
        return view.render('auth/login')
      }

      public async register({request,response,auth}: HttpContextContract){
        const userSchema = schema.create({
            email: schema.string({ trim: true }, [rules.email(),rules.unique({table:'users',column:'email', caseInsensitive:true})]),
            password: schema.string({}, [rules.minLength(8)])
        })
        const data = await request.validate({ schema: userSchema })
        const user = await User.create(data)
        await auth.login(user)
        return response.redirect('/')
      }
      public async login({ request, response, auth, session }: HttpContextContract) {
        // grab uid and password values off request body
        const { uid, password } = request.only(['uid', 'password'])
        try {
          // attempt to login
          await auth.attempt(uid, password)
        } catch (error) {
          // if login fails, return vague form message and redirect back
          session.flash('form', 'Your username, email, or password is incorrect')
          return response.redirect().back()
        }

        // otherwise, redirect to home page
        return response.redirect('/')
      }
      public async logout({ response, auth }: HttpContextContract) {
        // logout the user
        await auth.logout()
        // redirect to login page
        return response.redirect().toRoute('auth.login.show')
      }
}

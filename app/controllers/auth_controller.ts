import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async githubRedirect({ ally }: HttpContext) {
    return ally.use('github').redirect()
  }

  async githubCallback({ ally, auth, response }: HttpContext) {
    const gh = ally.use('github')

    if (gh.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (gh.stateMisMatch()) {
      return 'Request is expired, please try again'
    }

    if (gh.hasError()) {
      return gh.getError()
    }

    const user = await gh.user()
    const accessToken = user.token.token
    const existingUser = await User.findBy('github_id', user.id)

    if (existingUser) {
      existingUser.githubAccessToken = accessToken
      await existingUser.save()
      await auth.use('web').login(existingUser)
      return response.redirect('/')
    }

    const newUser = await User.create({
      email: user.email,
      username: user.name,
      githubId: user.id,
      githubAccessToken: accessToken,
      githubUsername: user.original.login,
    })

    await auth.use('web').login(newUser)
    return response.redirect('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}

import PullRequest from '#models/pull_request'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user?.$attributes
    const page = request.input('page', 1)

    const pullRequests = await PullRequest.query()
      .preload('user')
      .preload('language')
      .orderBy('createdAt', 'desc')
      .where('created_at', '>', new Date(new Date().setMonth(new Date().getDay() - 7)))
      .paginate(page, 10)

    return inertia.render('home', { user, pullRequests: pullRequests })
  }
}

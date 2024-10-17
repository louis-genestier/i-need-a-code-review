import Language from '#models/language'
import PullRequest from '#models/pull_request'
import type { HttpContext } from '@adonisjs/core/http'
import { createPullRequestValidator } from '#validators/pull_request'
import { GithubService } from '#services/github_service'

export default class PullRequestsController {
  async store({ request, auth, response, inertia, session }: HttpContext) {
    const user = auth.user

    if (!user) {
      return session.flash('errors', { global: 'You need to be logged in to add a pull request' })
    }

    const payload = await request.validateUsing(createPullRequestValidator)

    const { title, url, repositoryName, languageId, description } = payload

    const language = await Language.find(languageId)

    if (!language) {
      session.flash('errors', { languageId: ['Language not found'] })
      return response.redirect().back()
    }

    const existingPullRequest = await PullRequest.query().where('url', url).first()

    if (existingPullRequest) {
      session.flash('errors', { global: ['Pull request already exists'] })
      return response.redirect().back()
    }

    await PullRequest.create({
      title,
      url,
      repositoryName,
      userId: user.id,
      languageId: +languageId,
      description,
    })

    session.flash('success', { global: 'Pull request added successfully' })
    return inertia.location('/')
  }

  async create({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const githubService = new GithubService(user.githubAccessToken)
    const pullRequests = await githubService.getUserOpenPRs()
    const languages = await Language.all()
    return inertia.render('pull_request/add', { languages, pullRequests })
  }

  async destroy({ params, session, response, auth }: HttpContext) {
    const user = auth.user!
    const pullRequest = await PullRequest.find(params.id)

    if (!pullRequest) {
      session.flash('errors', { global: 'Pull request not found' })
      return response.redirect().back()
    }

    if (pullRequest.userId !== user.id) {
      session.flash('errors', { global: 'You are not authorized to delete this pull request' })
      return response.redirect().back()
    }

    await pullRequest.delete()

    session.flash('success', { global: 'Pull request deleted successfully' })
    return response.redirect().back()
  }
}

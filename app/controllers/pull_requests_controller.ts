import Language from '#models/language'
import PullRequest from '#models/pull_request'
import type { HttpContext } from '@adonisjs/core/http'

export default class PullRequestsController {
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const { title, url, repositoryName, languageId } = request.body()

    if (!title || !url || !repositoryName || !languageId) {
      return response.status(400).json({ error: 'Missing required fields' })
    }

    const language = await Language.find(languageId)

    if (!language) {
      return response.status(400).json({ error: 'Language not found' })
    }

    const pullRequest = await PullRequest.create({
      title,
      url,
      repositoryName,
      userId: user.id,
      languageId: +languageId,
    })

    return response.status(201).json(pullRequest)
  }
}

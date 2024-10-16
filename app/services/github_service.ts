import { Octokit } from '@octokit/rest'

export class GithubService {
  private client: Octokit

  constructor(private readonly githubAccessToken: string) {
    this.client = new Octokit({ auth: this.githubAccessToken })
  }

  async getUserOpenPRs() {
    const { data: user } = await this.client.users.getAuthenticated()
    const { data } = await this.client.request('GET /search/issues', {
      q: `is:pr is:open author:${user.login}`,
      sort: 'updated',
      order: 'desc',
    })

    return data.items.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.html_url,
      repositoryName: item.repository_url.split('/').pop(),
    }))
  }
}

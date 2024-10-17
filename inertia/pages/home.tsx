import PullRequest from '#models/pull_request'
import User from '#models/user'
import { Head, Link } from '@inertiajs/react'
import { PullRequestListing } from '../components/pull_request/listing'
import { Layout } from './layout'

export default function Home({
  user,
  pullRequests,
}: {
  user: User | null
  pullRequests: {
    data: PullRequest[]
    meta: {
      currentPage: number
      lastPage: number
    }
  }
}) {
  return (
    <Layout>
      <Head title="Homepage" />

      <div>
        <h1>Homepage</h1>
        <p>Welcome, {user?.username || 'Guest'}!</p>
        {user && (
          <div>
            <Link href="/pull-requests/create" method="get" as="button" type="button">
              Add Pull Request
            </Link>
            <Link href="/logout" method="post" as="button" type="button">
              Logout
            </Link>
          </div>
        )}
        {!user && (
          <button
            onClick={() => {
              window.location.href = '/github/redirect'
            }}
          >
            Login with Github
          </button>
        )}
        <PullRequestListing
          pullRequests={pullRequests.data}
          currentPage={pullRequests.meta.currentPage}
          lastPage={pullRequests.meta.lastPage}
        />
      </div>
    </Layout>
  )
}

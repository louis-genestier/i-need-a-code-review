import PullRequest from '#models/pull_request'
import User from '#models/user'
import { Head } from '@inertiajs/react'
import { PullRequestListing } from './pull_request/listing'

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
    <>
      <Head title="Homepage" />

      <div>
        <h1>Homepage</h1>
        <p>Welcome, {user?.username || 'Guest'}!</p>
        <PullRequestListing
          pullRequests={pullRequests.data}
          currentPage={pullRequests.meta.currentPage}
          lastPage={pullRequests.meta.lastPage}
        />
      </div>
    </>
  )
}

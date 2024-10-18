import { PullRequestCard } from './card'
import PullRequest from '#models/pull_request'
import { Pagination } from '../pagination'
import { router } from '@inertiajs/react'

interface PullRequestListingProps {
  pullRequests: PullRequest[]
  currentPage: number
  lastPage: number
}

export const PullRequestListing = ({
  pullRequests,
  currentPage,
  lastPage,
}: PullRequestListingProps) => {
  return (
    <div className="flex flex-col items-center">
      {pullRequests.length === 0 && (
        <p className="text-center text-gray-500 my-8">No pull requests found for now</p>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {pullRequests.map((pr) => (
          <PullRequestCard key={pr.id} pullRequest={pr} />
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <Pagination
          currentPage={currentPage}
          totalPages={lastPage}
          onPageChange={(page) => {
            router.get('/', { page }, { preserveState: true })
          }}
        />
      </div>
    </div>
  )
}

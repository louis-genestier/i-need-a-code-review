import { PageProps } from '#config/inertia'
import PullRequest from '#models/pull_request'
import { usePage, router } from '@inertiajs/react'

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
  const { currentUser } = usePage<PageProps>().props
  return (
    <div>
      <h2>Pull Requests</h2>
      {pullRequests.length === 0 && <p>No pull requests found for now</p>}
      <div className="flex flex-col gap-4">
        {pullRequests.map((pr) => (
          <div key={pr.id}>
            <p>{pr.title}</p>
            <p>{pr.language.displayName}</p>
            {currentUser?.id === pr.user.id && (
              <button
                onClick={() => {
                  router.delete(`/pull-requests/${pr.id}`, {
                    onSuccess: () => {
                      router.reload({ only: ['pullRequests'] })
                    },
                  })
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <p>Current Page: {currentPage}</p>
      <p>Last Page: {lastPage}</p>
    </div>
  )
}

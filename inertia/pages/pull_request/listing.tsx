import PullRequest from '#models/pull_request'

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
    <div>
      <h2>Pull Requests</h2>
      {pullRequests.length === 0 && <p>No pull requests found for now</p>}
      <ul>
        {pullRequests.map((pr) => (
          <li key={pr.id}>{pr.title}</li>
        ))}
      </ul>
      <p>Current Page: {currentPage}</p>
      <p>Last Page: {lastPage}</p>
    </div>
  )
}

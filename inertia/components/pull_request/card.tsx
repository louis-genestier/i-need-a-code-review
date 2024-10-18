import { useState } from 'react'
import { PageProps } from '#config/inertia'
import { usePage, router } from '@inertiajs/react'
import { Trash2, ExternalLink, Eye } from 'lucide-react'
import PullRequest from '#models/pull_request'

interface PullRequestCardProps {
  pullRequest: PullRequest
}

export const PullRequestCard = ({ pullRequest: pr }: PullRequestCardProps) => {
  const { currentUser } = usePage<PageProps>().props
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleModal = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <a href={pr.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden relative flex flex-col h-full">
          <ExternalLink className="absolute top-4 right-4 w-5 h-5 text-gray-400" />
          <div className="p-4 flex flex-col h-full">
            <div className="flex flex-col gap-2">
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white w-fit"
                style={{ backgroundColor: pr.language.color }}
              >
                {pr.language.displayName}
              </span>
              <h3 className="text-base font-semibold text-white line-clamp-1">{pr.title}</h3>
              <p className="text-gray-400 text-xs">Created by {pr.user.githubUsername}</p>
            </div>

            <div className="mt-2 flex-grow overflow-hidden">
              <p className="text-gray-300 text-sm line-clamp-3">{pr.description}</p>
              {pr.description && pr.description.length > 100 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleModal()
                  }}
                  className="text-blue-400 hover:text-blue-300 text-xs mt-1 flex items-center"
                >
                  <Eye className="h-3 w-3 inline mr-1" />
                  Show more
                </button>
              )}
            </div>

            {currentUser?.id === pr.user.id && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.delete(`/pull-requests/${pr.id}`, {
                    onSuccess: () => {
                      router.reload({ only: ['pullRequests'] })
                    },
                  })
                }}
                className="text-gray-400 hover:text-red-400 text-xs focus:outline-none transition-colors duration-200 z-10 flex items-center mt-auto pt-2 xl:text-base"
              >
                <Trash2 className="h-3 w-3 inline mr-1 xl:h-4 xl:w-4" />
                Delete
              </button>
            )}
          </div>
        </div>
      </a>
      {isExpanded && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg shadow-lg w-3/4 md:w-3/5 bg-gray-900">
            <h3 className="text-lg font-semibold">Pull Request Details</h3>
            <p className="mt-2 break-words whitespace-pre-wrap overflow-y-auto max-h-[80vh]">
              {pr.description}
            </p>
            <button
              onClick={toggleModal}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

import { useState } from 'react'
import { PageProps } from '#config/inertia'
import { usePage, router } from '@inertiajs/react'
import { Trash2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import PullRequest from '#models/pull_request'

interface PullRequestCardProps {
  pullRequest: PullRequest
}

export const PullRequestCard = ({ pullRequest: pr }: PullRequestCardProps) => {
  const { currentUser } = usePage<PageProps>().props
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <a href={pr.url} target="_blank" className="w-full">
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden relative">
        <ExternalLink className="absolute top-6 right-6 w-6 h-6 text-gray-400" />
        <div className="p-6">
          <div className="flex flex-col gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white w-fit`}
              style={{ backgroundColor: pr.language.color }}
            >
              {pr.language.displayName}
            </span>
            <h3 className="text-lg font-semibold text-white">{pr.title}</h3>
            <p className="text-gray-400 text-sm">Created by {pr.user.githubUsername}</p>

            <div className="mb-4">
              <p className={`text-gray-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                {pr.description && pr.description.length > 500
                  ? `${pr.description.slice(0, 500)}...`
                  : pr.description}
              </p>
              {pr.description && pr.description.length > 100 && (
                <button
                  onClick={toggleExpand}
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2 flex items-center"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show more
                    </>
                  )}
                </button>
              )}
            </div>
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
              className="text-gray-400 hover:text-red-400 text-sm focus:outline-none transition-colors duration-200 z-50 flex items-center"
            >
              <Trash2 className="h-4 w-4 inline mr-1" />
              Delete
            </button>
          )}
        </div>
      </div>
    </a>
  )
}

import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Layout } from '../layout'
import { ChevronDown } from 'lucide-react'

interface Language {
  id: number
  displayName: string
}

interface PullRequest {
  id: number
  title: string
  url: string
  repositoryName: string
}

export default function AddPullRequestPage({
  languages,
  pullRequests,
}: {
  languages: Language[]
  pullRequests: PullRequest[]
}) {
  const [selectedPullRequest, setSelectedPullRequest] = useState<PullRequest | null>(null)

  const {
    data,
    setData,
    post,
    processing,
    errors: formErrors,
  } = useForm({
    title: '',
    url: '',
    repositoryName: '',
    description: '',
    languageId: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/pull-requests', {
      preserveState: true,
    })
  }

  useEffect(() => {
    if (selectedPullRequest) {
      setData({
        ...data,
        title: selectedPullRequest.title,
        url: selectedPullRequest.url,
        repositoryName: selectedPullRequest.repositoryName,
      })
    }
  }, [selectedPullRequest])

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Add Pull Request</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Select a Pull Request</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pullRequests.map((pullRequest) => (
                <div
                  key={pullRequest.id}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedPullRequest?.id === pullRequest.id
                      ? 'ring-2 ring-indigo-500'
                      : 'hover:bg-gray-750'
                  }`}
                  onClick={() => setSelectedPullRequest(pullRequest)}
                >
                  <h3 className="text-lg font-medium text-white mb-2">{pullRequest.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{pullRequest.url}</p>
                  <p className="text-sm text-gray-400">{pullRequest.repositoryName}</p>
                </div>
              ))}
            </div>
            {(formErrors.url || formErrors.title || formErrors.repositoryName) && (
              <p className="mt-2 text-sm text-red-500">
                You should select a pull request from the list above
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a description for your pull request"
            />
          </div>

          <div>
            <label htmlFor="languageId" className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <div className="relative">
              <select
                id="languageId"
                name="languageId"
                value={data.languageId}
                onChange={(e) => setData('languageId', e.target.value)}
                className="block w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.displayName}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
            {formErrors.languageId && (
              <p className="mt-2 text-sm text-red-500">{formErrors.languageId}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={processing}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {processing ? 'Submitting...' : 'Submit Pull Request'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

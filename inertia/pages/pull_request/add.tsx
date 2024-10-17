import Language from '#models/language'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Layout } from '../layout'

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
      <div>
        <h1>Add Pull Request</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <h2>Pull Requests</h2>
            {pullRequests.map((pullRequest) => (
              <div
                key={pullRequest.id}
                className={`flex flex-col gap-2 w-1/3 border-2 border-gray-300 p-4 rounded-md ${
                  selectedPullRequest?.id === pullRequest.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedPullRequest(pullRequest)}
              >
                <h3>{pullRequest.title}</h3>
                <p>{pullRequest.url}</p>
                <p>{pullRequest.repositoryName}</p>
              </div>
            ))}
            {(formErrors.url || formErrors.title || formErrors.repositoryName) && (
              <p className="text-red-500">You should select a pull request from the list above</p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="languageId">Language</label>
            <select
              name="languageId"
              value={data.languageId}
              onChange={(e) => setData('languageId', e.target.value)}
            >
              <option value="">Select a language</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.displayName}
                </option>
              ))}
            </select>
            {formErrors.languageId && <p className="text-red-500">{formErrors.languageId}</p>}
          </div>
          <button type="submit" disabled={processing}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

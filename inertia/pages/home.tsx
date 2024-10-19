import PullRequest from '#models/pull_request'
import User from '#models/user'
import { Head, Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { PullRequestListing } from '../components/pull_request/listing'
import { Layout } from './layout'
import { toast } from 'react-hot-toast'

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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">Latest Pull Requests</h2>
          <Link
            href={user ? '/pull-requests/create' : '#'}
            method="get"
            as="button"
            type="button"
            className={
              user
                ? 'inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
                : 'inline-flex items-center px-3 py-1.5 border border-gray-500 text-sm font-medium rounded-md text-gray-500 bg-gray-700 cursor-not-allowed'
            }
            onClick={() => {
              if (!user) {
                console.log('user', user)
                toast.error('You must login to create a pull request')
              }
            }}
          >
            <Plus size={16} className="mr-1.5" />
            New PR
          </Link>
        </div>

        <PullRequestListing
          pullRequests={pullRequests.data}
          currentPage={pullRequests.meta.currentPage}
          lastPage={pullRequests.meta.lastPage}
        />
      </div>
    </Layout>
  )
}

import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '#config/inertia'
import { Menu, X, Github, LogOut } from 'lucide-react'

export const Navbar = () => {
  const { currentUser } = usePage<PageProps>().props
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">
              I Need A Code Review
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser ? (
              <Link
                href="/logout"
                method="post"
                as="button"
                type="button"
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                Logout
              </Link>
            ) : (
              <button
                onClick={() => {
                  window.location.href = '/github/redirect'
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                <Github className="mr-3 h-5 w-5" aria-hidden="true" />
                Login with Github
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

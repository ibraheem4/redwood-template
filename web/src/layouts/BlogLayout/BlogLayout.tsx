import { navigate, Link, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast' // Added toast import

import { useAuth } from 'src/auth'
import LanguageSelect from 'src/components/LanguageSelect/LanguageSelect'
import { appendLangToRoute } from 'src/utils/routeUtils'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { logOut, isAuthenticated, currentUser, loading } = useAuth()

  const logoutHandler = () => {
    logOut()
    toast.success('Successfully logged out')
    navigate(routes.home())
  }

  const displayCurrentUser = () => {
    if (loading) {
      return null
    }

    if (!isAuthenticated) {
      return (
        <>
          <li>
            <Link
              to={appendLangToRoute(routes.login())}
              className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to={appendLangToRoute(routes.signup())}
              className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              Signup
            </Link>
          </li>
        </>
      )
    }

    return (
      <>
        <li>
          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-transparent border-none cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
          >
            Logout
          </button>
        </li>
        <li>
          <div className="right-0 px-4 py-2">
            {currentUser && currentUser.email
              ? `Logged in as ${currentUser.email}`
              : 'Logged in'}
          </div>
        </li>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <header className="dark:bg-neutral-900"></header>
      <main className="flex-grow bg-zinc-100 dark:bg-black">
        <nav
          className="max-w-6xl px-4 py-2 mx-auto bg-white dark:bg-neutral-900 dark:text-white sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="flex items-center justify-between w-full h-16 py-2 border-b border-black dark:border-white">
            <div className="flex items-center">
              <Link
                className="text-2xl font-bold text-black uppercase dark:text-white"
                to={appendLangToRoute(routes.home())}
              >
                Stencil DBAuth
              </Link>
            </div>
            <div className="ml-10 space-x-4">
              <ul className="relative flex items-center font-light">
                <li>
                  <Link
                    className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                    to={appendLangToRoute(routes.about())}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                    to={appendLangToRoute(routes.contact())}
                  >
                    Contact
                  </Link>
                </li>
                {displayCurrentUser()}
              </ul>
            </div>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-6xl p-4 mx-auto bg-white dark:bg-neutral-900 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
        <nav
          className="flex justify-between max-w-6xl px-4 py-2 mx-auto bg-white dark:bg-neutral-900 dark:text-white sm:px-6 lg:px-8"
          aria-label="Bottom"
        >
          <LanguageSelect />
          <small className="text-xs text-center rtl:text-left rtl:text-sm dark:text-white">
            Copyright © 2023 Stencil DBAuth
          </small>
        </nav>
      </main>
      <footer className="dark:bg-neutral-900"></footer>
    </>
  )
}

export default BlogLayout

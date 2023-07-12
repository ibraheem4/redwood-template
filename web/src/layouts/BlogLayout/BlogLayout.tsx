import { navigate, Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

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
              className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to={appendLangToRoute(routes.signup())}
              className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
            >
              Signup
            </Link>
          </li>
        </>
      )
    }

    return (
      <>
        <button
          type="button"
          onClick={logoutHandler}
          className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
        >
          Logout
        </button>
        <div className="right-0 bottom-1 mr-12 text-xs">
          <span>Logged in as {currentUser.email}</span>
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <header className="dark:bg-neutral-900"></header>
      <main className="flex-grow bg-zinc-100 dark:bg-black">
        <nav
          className="mx-auto max-w-6xl bg-white px-4 dark:bg-neutral-800 dark:text-white sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="flex w-full items-center justify-between border-b border-black py-2 dark:border-white">
            <div className="flex items-center">
              <Link
                className="dark:text-white"
                to={appendLangToRoute(routes.home())}
              >
                Redwood Blog
              </Link>
            </div>
            <div className="ml-10 space-x-4">
              <ul className="relative flex items-center font-light">
                <li>
                  <Link
                    className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
                    to={appendLangToRoute(routes.about())}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
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
        <div className="mx-auto max-w-6xl">
          <div className="max-w-6xl bg-white dark:bg-neutral-900 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
        <nav
          className="mx-auto flex max-w-6xl justify-between bg-white px-4 dark:bg-neutral-800 dark:text-white sm:px-6 lg:px-8"
          aria-label="Bottom"
        >
          <LanguageSelect />
          <small className="text-center text-xs rtl:text-left rtl:text-sm dark:text-white">
            Copyright © 2022 Ibraheem Corporation
          </small>
        </nav>
      </main>
      <footer className="dark:bg-neutral-900"></footer>
    </>
  )
}

export default BlogLayout

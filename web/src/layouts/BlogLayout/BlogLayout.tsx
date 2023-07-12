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
          <Link
            to={appendLangToRoute(routes.login())}
            className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to={appendLangToRoute(routes.signup())}
            className="rounded px-4 py-2 transition duration-100 hover:bg-gray-100"
          >
            Signup
          </Link>
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
          <span>Logged in as {currentUser.email}</span>{' '}
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <header className="relative flex items-center justify-between px-8 py-4 dark:bg-black dark:text-white">
        <h1 className="text-5xl font-semibold tracking-tight">
          <Link
            className="dark:text-white"
            to={appendLangToRoute(routes.home())}
          >
            Redwood Blog
          </Link>
        </h1>
        <nav>
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
        </nav>
      </header>
      <main className="flex-grow dark:bg-black">{children}</main>
      <footer className="dark:bg-black">
        <LanguageSelect />
      </footer>
    </>
  )
}

export default BlogLayout

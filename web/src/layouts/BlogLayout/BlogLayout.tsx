import { navigate, Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

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
        <Link to={routes.login()} className="px-4 py-2">
          Login
        </Link>
      )
    }

    return (
      <>
        <button type="button" onClick={logoutHandler} className="px-4 py-2">
          Logout
        </button>
        <div className="bottom-1 right-0 mr-12 text-xs text-blue-300">
          <span>Logged in as {currentUser.email}</span>{' '}
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <header className="relative flex items-center justify-between bg-blue-700 px-8 py-4 text-white dark:bg-black">
        <h1 className="text-5xl font-semibold tracking-tight">
          <Link
            className="text-blue-400 transition duration-100 hover:text-blue-100"
            to={routes.home()}
          >
            Redwood Blog
          </Link>
        </h1>
        <nav>
          <ul className="relative flex items-center font-light">
            <li>
              <Link
                className="rounded px-4 py-2 transition duration-100 hover:bg-blue-600"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="rounded px-4 py-2 transition duration-100 hover:bg-blue-600"
                to={routes.contact()}
              >
                Contact
              </Link>
            </li>
            {displayCurrentUser()}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl rounded-b bg-white p-12 shadow">
        {children}
      </main>
    </>
  )
}

export default BlogLayout

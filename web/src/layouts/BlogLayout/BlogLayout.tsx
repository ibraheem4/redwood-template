import React, { useEffect, useRef } from 'react'

import { navigate, Link, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import LanguageSelect from 'src/components/LanguageSelect/LanguageSelect'
import { appendLangToRoute } from 'src/utils/routeUtils'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { logOut, isAuthenticated, loading, signUp, logIn, userMetadata } =
    useAuth()
  const prevIsAuthenticated = useRef(null)

  useEffect(() => {
    if (isAuthenticated && !prevIsAuthenticated.current) {
      toast.success('Successfully logged in')
      navigate(routes.home())
    }
    prevIsAuthenticated.current = isAuthenticated
  }, [isAuthenticated])

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
            <button
              onClick={logIn}
              className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={signUp}
              className="px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              Signup
            </button>
          </li>
        </>
      )
    }

    return (
      <>
        <li>
          <button
            onClick={logoutHandler}
            className="cursor-pointer border-none bg-transparent px-4 py-2 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
          >
            Logout
          </button>
        </li>
        <li>
          <div className="right-0 px-4 py-2">
            Logged in as {userMetadata?.email}
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
          className="mx-auto max-w-6xl bg-white px-4 py-2 sm:px-6 lg:px-8 dark:bg-neutral-900 dark:text-white"
          aria-label="Top"
        >
          <div className="flex h-16 w-full items-center justify-between border-b border-black py-2 dark:border-white">
            <div className="flex items-center">
              <Link
                className="text-2xl font-bold uppercase text-black dark:text-white"
                to={appendLangToRoute(routes.home())}
              >
                Stencil Auth0
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
        <div className="mx-auto max-w-6xl">
          TEST
          <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8 dark:bg-neutral-900">
            {children}
          </div>
        </div>
        <nav
          className="mx-auto flex max-w-6xl justify-between bg-white px-4 py-2 sm:px-6 lg:px-8 dark:bg-neutral-900 dark:text-white"
          aria-label="Bottom"
        >
          <LanguageSelect />
          <small className="text-center text-xs rtl:text-left rtl:text-sm dark:text-white">
            Copyright © 2023 Stencil Auth0
          </small>
        </nav>
      </main>
      <footer className="dark:bg-neutral-900"></footer>
    </>
  )
}

export default BlogLayout

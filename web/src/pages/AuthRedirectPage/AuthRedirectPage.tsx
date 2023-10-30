import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const AuthRedirectPage = () => {
  const { logIn } = useAuth()

  useEffect(() => {
    logIn()
  }, [logIn])

  return (
    <>
      <MetaTags title="AuthRedirect" description="AuthRedirect page" />

      <div>Redirecting to Auth0...</div>
    </>
  )
}

export default AuthRedirectPage

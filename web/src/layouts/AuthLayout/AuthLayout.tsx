import { Link, routes } from '@redwoodjs/router'

import LanguageSelect from 'src/components/LanguageSelect'
import { appendLangToRoute } from 'src/utils/routeUtils'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Link to={appendLangToRoute(routes.home())}>Back to Home</Link>
      {children}
      <LanguageSelect />
    </>
  )
}

export default AuthLayout

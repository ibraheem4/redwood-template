import { Link, routes } from '@redwoodjs/router'

import LanguageSelect from 'src/components/LanguageSelect'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Link to={routes.home()}>Back to Home</Link>
      {children}
      <LanguageSelect />
    </>
  )
}

export default AuthLayout

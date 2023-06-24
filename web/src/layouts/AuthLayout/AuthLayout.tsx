import LanguageSelect from 'src/components/LanguageSelect'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      {children}
      <LanguageSelect />
    </>
  )
}

export default AuthLayout

import Footer from 'src/components/Footer'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default AuthLayout

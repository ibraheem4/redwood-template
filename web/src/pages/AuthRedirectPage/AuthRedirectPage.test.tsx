import { act } from 'react-dom/test-utils'

import { render, screen } from '@redwoodjs/testing/web'

import AuthRedirectPage from './AuthRedirectPage'

// Mocking the useAuth hook from 'src/auth'
jest.mock('src/auth', () => {
  const logInMock = jest.fn()
  return {
    __esModule: true,
    useAuth: jest.fn().mockReturnValue({
      logIn: logInMock,
    }),
    logInMock,
  }
})

describe('AuthRedirectPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders successfully', () => {
    act(() => {
      render(<AuthRedirectPage />)
    })
    expect(screen.getByText('Redirecting to Auth0...')).toBeInTheDocument()
  })

  it('calls logIn on mount', () => {
    const { logInMock } = require('src/auth')

    act(() => {
      render(<AuthRedirectPage />)
    })

    expect(logInMock).toHaveBeenCalledTimes(1)
  })
})

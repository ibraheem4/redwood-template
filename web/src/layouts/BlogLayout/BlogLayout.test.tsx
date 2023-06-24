import { render, screen, waitFor } from '@redwoodjs/testing'

import BlogLayout from './BlogLayout'

const EMAIL = 'rob@redwoodjs.com'
const loggedIn = () => {
  mockCurrentUser({
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
    email: EMAIL,
    roles: ['String'],
  })
}
const loggedOut = () => {
  mockCurrentUser(null)
}

describe('BlogLayout', () => {
  it('displays a Login link when not logged in', async () => {
    loggedOut()
    render(<BlogLayout>Children</BlogLayout>)

    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Signup')).toBeInTheDocument())
  })

  it('displays a Logout link when logged in', async () => {
    loggedIn()
    render(<BlogLayout>Children</BlogLayout>)

    await waitFor(() => expect(screen.getByText('Logout')).toBeInTheDocument())
  })

  it("displays a logged in user's email address", async () => {
    loggedIn()
    render(<BlogLayout>Children</BlogLayout>)

    await waitFor(() =>
      expect(screen.getByText(`Logged in as ${EMAIL}`)).toBeInTheDocument()
    )
  })
})

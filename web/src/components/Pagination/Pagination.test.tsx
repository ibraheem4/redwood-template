import { render, screen } from '@testing-library/react'

import Pagination from './Pagination'

jest.mock('@redwoodjs/router', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
  routes: {
    home: (params: { page: number }) => `/home/${params.page}`,
  },
}))

describe('Pagination', () => {
  it('renders the correct number of pages', () => {
    const count = 20
    const postsPerPage = 5
    const totalPages = count / postsPerPage
    render(<Pagination count={count} postsPerPage={postsPerPage} />)

    const paginationItems = screen.getAllByRole('listitem')
    expect(paginationItems).toHaveLength(totalPages)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(totalPages)

    // Verify each link
    for (let i = 0; i < totalPages; i++) {
      const linkElement = links[i] as HTMLAnchorElement
      expect(linkElement.href).toContain(`/home/${i + 1}`)
      expect(linkElement).toHaveTextContent(`${i + 1}`)
    }
  })
})

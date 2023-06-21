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
    const count = 10
    render(<Pagination count={count} />)

    const paginationItems = screen.getAllByRole('listitem')
    expect(paginationItems).toHaveLength(2) // count divided by POSTS_PER_PAGE

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)

    const expectedLinkProps1 = { to: '/home/1', children: '1' }
    const expectedLinkProps2 = { to: '/home/2', children: '2' }

    const linkElement1 = links[0] as HTMLAnchorElement
    const linkElement2 = links[1] as HTMLAnchorElement

    expect(linkElement1.href).toContain(expectedLinkProps1.to)
    expect(linkElement1).toHaveTextContent(expectedLinkProps1.children)

    expect(linkElement2.href).toContain(expectedLinkProps2.to)
    expect(linkElement2).toHaveTextContent(expectedLinkProps2.children)
  })
})

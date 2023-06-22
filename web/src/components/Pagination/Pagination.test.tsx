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
    render(<Pagination count={count} postsPerPage={postsPerPage} />)

    const paginationItems = screen.getAllByRole('listitem')
    expect(paginationItems).toHaveLength(count / postsPerPage) // count divided by postsPerPage

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(count / postsPerPage)

    const expectedLinkProps1 = { to: '/home/1', children: '1' }
    const expectedLinkProps2 = { to: '/home/2', children: '2' }
    const expectedLinkProps3 = { to: '/home/3', children: '3' }
    const expectedLinkProps4 = { to: '/home/4', children: '4' }

    const linkElement1 = links[0] as HTMLAnchorElement
    const linkElement2 = links[1] as HTMLAnchorElement
    const linkElement3 = links[2] as HTMLAnchorElement
    const linkElement4 = links[3] as HTMLAnchorElement

    expect(linkElement1.href).toContain(expectedLinkProps1.to)
    expect(linkElement1).toHaveTextContent(expectedLinkProps1.children)

    expect(linkElement2.href).toContain(expectedLinkProps2.to)
    expect(linkElement2).toHaveTextContent(expectedLinkProps2.children)

    expect(linkElement3.href).toContain(expectedLinkProps3.to)
    expect(linkElement3).toHaveTextContent(expectedLinkProps3.children)

    expect(linkElement4.href).toContain(expectedLinkProps4.to)
    expect(linkElement4).toHaveTextContent(expectedLinkProps4.children)
  })
})

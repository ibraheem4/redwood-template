import { render } from '@redwoodjs/testing'

import Pagination from './Pagination'

describe('Pagination', () => {
  it('renders the correct number of pagination items', () => {
    const count = 10
    const postsPerPage = 5

    const { getAllByRole } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const paginationItems = getAllByRole('link')
    expect(paginationItems).toHaveLength(2) // Since count is 10 and postsPerPage is 5, there should be 2 pagination items

    // Verify the text content and href of each pagination item
    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', `/?page=${pageNumber}`)
    })
  })

  it('renders the current page with the correct styling', () => {
    const count = 10
    const postsPerPage = 5

    const { getByText } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const currentPage = getByText('1')
    expect(currentPage).toHaveClass('bg-blue-500 text-white') // The first page should have the active styling
  })

  it('renders the non-current pages with the correct styling', () => {
    const count = 10
    const postsPerPage = 5

    const { getByText } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const nonCurrentPage = getByText('2')
    expect(nonCurrentPage).toHaveClass('bg-blue-100 text-blue-700') // The second page should have the non-active styling
  })
})

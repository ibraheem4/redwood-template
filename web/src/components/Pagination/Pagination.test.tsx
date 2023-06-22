import { useLocation } from '@redwoodjs/router'
import { render } from '@redwoodjs/testing'

import Pagination from './Pagination'

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  useLocation: jest.fn(),
}))

// Cast 'useLocation' as a jest mock function
const mockUseLocation = useLocation as jest.Mock

describe('Pagination', () => {
  beforeEach(() => {
    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))
  })

  it('renders the correct number of pagination items', () => {
    const count = 10
    const postsPerPage = 5

    const { getAllByRole } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const paginationItems = getAllByRole('link')
    expect(paginationItems).toHaveLength(2)

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
    expect(currentPage).toHaveClass('bg-blue-500 text-white')
  })

  it('renders the non-current pages with the correct styling', () => {
    const count = 10
    const postsPerPage = 5

    const { getByText } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const nonCurrentPage = getByText('2')
    expect(nonCurrentPage).toHaveClass('bg-blue-100 text-blue-700')
  })

  it('renders with just enough posts to create a new page', () => {
    const count = 10
    const postsPerPage = 5

    mockUseLocation.mockImplementation(() => ({ search: '?page=2' }))

    const { getByText } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const currentPage = getByText('2')
    expect(currentPage).toHaveClass('bg-blue-500 text-white')
  })

  it('renders correctly with no posts', () => {
    const count = 0
    const postsPerPage = 5

    const { queryByRole } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders the correct number of pagination items when count is not evenly divisible by postsPerPage', () => {
    const count = 17
    const postsPerPage = 5

    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))

    const { getAllByRole } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const paginationItems = getAllByRole('link')
    expect(paginationItems).toHaveLength(4)

    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', `/?page=${pageNumber}`)
    })
  })

  it('renders the correct number of pagination items when postsPerPage is greater than count', () => {
    const count = 5
    const postsPerPage = 10

    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))

    const { getAllByRole } = render(
      <Pagination count={count} postsPerPage={postsPerPage} />
    )

    const paginationItems = getAllByRole('link')
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(paginationItems).toHaveLength(1) // verify that only one pagination item exists

    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      expect(item).toBeInTheDocument() // use .toBeInTheDocument() to assert the existence of each item
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', `/?page=${pageNumber}`)
    })
  })
})

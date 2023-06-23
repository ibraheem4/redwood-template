import { useLocation, routes } from '@redwoodjs/router'
import { render } from '@redwoodjs/testing'

import Pagination from './Pagination'

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  useLocation: jest.fn(),
}))

const mockUseLocation = useLocation as jest.Mock

// Helper function
function makePageUrl(base, pageNumber) {
  return `${base}?page=${pageNumber}`
}

describe('Pagination', () => {
  const count = 10
  const itemsPerPage = 5
  const homeRouteName = 'home'
  beforeEach(() => {
    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))
  })

  it('renders the correct number of pagination items', () => {
    const { getAllByRole } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const paginationItems = getAllByRole('link')
    expect(paginationItems).toHaveLength(2)

    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      const href = makePageUrl(routes[homeRouteName](), pageNumber)
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', href)
    })
  })

  it('renders the current page with the correct styling', () => {
    const { getByText } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const currentPage = getByText('1')
    expect(currentPage).toHaveClass('bg-blue-500 text-white')
  })

  it('renders the non-current pages with the correct styling', () => {
    const { getByText } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const nonCurrentPage = getByText('2')
    expect(nonCurrentPage).toHaveClass('bg-blue-100 text-blue-700')
  })

  it('renders with just enough posts to create a new page', () => {
    mockUseLocation.mockImplementation(() => ({ search: '?page=2' }))

    const { getByText } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const currentPage = getByText('2')
    expect(currentPage).toHaveClass('bg-blue-500 text-white')
  })

  it('renders correctly with no posts', () => {
    const count = 0

    const { queryByRole } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders the correct number of pagination items when count is not evenly divisible by itemsPerPage', () => {
    const count = 17

    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))

    const { getAllByRole } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const paginationItems = getAllByRole('link')
    expect(paginationItems).toHaveLength(4)

    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      const href = makePageUrl(routes[homeRouteName](), pageNumber)
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', href)
    })
  })

  it('renders the correct number of pagination items when itemsPerPage is greater than count', () => {
    const count = 5
    const itemsPerPage = 10

    mockUseLocation.mockImplementation(() => ({ search: '?page=1' }))

    const { getAllByRole } = render(
      <Pagination
        count={count}
        itemsPerPage={itemsPerPage}
        routeName={homeRouteName}
      />
    )

    const paginationItems = getAllByRole('link')
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(paginationItems).toHaveLength(1) // verify that only one pagination item exists

    paginationItems.forEach((item, index) => {
      const pageNumber = index + 1
      const href = makePageUrl(routes[homeRouteName](), pageNumber)
      expect(item).toBeInTheDocument()
      expect(item).toHaveTextContent(String(pageNumber))
      expect(item).toHaveAttribute('href', href)
    })
  })
})

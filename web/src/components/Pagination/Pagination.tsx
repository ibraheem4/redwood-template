import { Link, routes, useLocation } from '@redwoodjs/router'

import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'

const Pagination = ({ count, postsPerPage = DEFAULT_POSTS_PER_PAGE }) => {
  const location = useLocation()
  const currentPage = location.search
    ? new URLSearchParams(location.search).get('page')
    : '1'

  const items = []

  for (let i = 0; i < Math.ceil(count / postsPerPage); i++) {
    items.push(
      <li key={i} className={`inline-block ${i > 0 ? 'ml-2' : ''}`}>
        <Link
          to={routes.home({ page: i + 1 })}
          className={`${
            i + 1 === parseInt(currentPage)
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-700'
          } rounded-lg px-3 py-1`}
        >
          {i + 1}
        </Link>
      </li>
    )
  }

  return (
    <>
      <ul className="flex justify-center">{items}</ul>
    </>
  )
}

export default Pagination

import { Link, routes, useLocation } from '@redwoodjs/router'

import { appendLangToRoute } from 'src/utils/routeUtils'

const Pagination = ({ count, itemsPerPage, routeName }) => {
  const location = useLocation()
  const currentPage = location.search
    ? new URLSearchParams(location.search).get('page')
    : '1'

  const items = []

  for (let i = 0; i < Math.ceil(count / itemsPerPage); i++) {
    items.push(
      <li key={i} className={`inline-block ${i > 0 ? 'ml-2' : ''}`}>
        <Link
          to={appendLangToRoute(routes[routeName]({ page: i + 1 }))}
          className={`${
            i + 1 === parseInt(currentPage)
              ? 'bg-black text-white'
              : 'bg-white text-black'
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

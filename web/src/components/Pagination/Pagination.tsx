import { Link, routes } from '@redwoodjs/router'

import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'

const Pagination = ({ count, postsPerPage = DEFAULT_POSTS_PER_PAGE }) => {
  const items = []

  for (let i = 0; i < Math.ceil(count / postsPerPage); i++) {
    items.push(
      <li key={i}>
        <Link to={routes.home({ page: i + 1 })}>{i + 1}</Link>
      </li>
    )
  }

  return (
    <>
      <h2>Pagination</h2>
      <ul>{items}</ul>
    </>
  )
}

export default Pagination

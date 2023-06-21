import { Link, routes } from '@redwoodjs/router'

const POSTS_PER_PAGE = 5

const Pagination = ({ count }) => {
  const items = []

  for (let i = 0; i < Math.ceil(count / POSTS_PER_PAGE); i++) {
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

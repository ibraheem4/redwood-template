import type { FindPosts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Posts from 'src/components/Post/Posts'
import { appendLangToRoute } from 'src/utils/routeUtils'

export const QUERY = gql`
  query FindPosts {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div className="dark:text-white">Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No posts yet. '}
      <Link to={appendLangToRoute(routes.newPost())} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<FindPosts>) => {
  return <Posts posts={posts} />
}

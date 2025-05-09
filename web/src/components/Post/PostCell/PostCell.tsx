import type { FindPostById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Post from 'src/components/Post/Post'

export const QUERY = gql`
  query FindPostById($id: String!) {
    post: adminPost(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div className="dark:text-white">Loading...</div>

export const Empty = () => <div>Post not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post }: CellSuccessProps<FindPostById>) => {
  return <Post post={post} />
}

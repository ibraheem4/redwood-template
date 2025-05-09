import type { CommentsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery($postId: String!) {
    comments(postId: $postId) {
      id
      name
      body
      postId
      createdAt
    }
  }
`

export const Loading = () => <div className="dark:text-white">Loading...</div>

export const Empty = () => {
  return <div className="text-center text-gray-500">No comments yet</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ comments }: CellSuccessProps<CommentsQuery>) => {
  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}

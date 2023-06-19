import type { BlogPostQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'

export const QUERY = gql`
  query BlogPostQuery($id: String!) {
    blogPost: post(id: $id) {
      id
      title
      body
      createdAt
      user {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div>Error: {error.message}</div>
)

export const Success = ({ blogPost }: CellSuccessProps<BlogPostQuery>) => {
  return <BlogPost blogPost={blogPost} />
}

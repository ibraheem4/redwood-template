import type { BlogPostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'

export const QUERY = gql`
  query BlogPostsQuery {
    blogPosts: posts {
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

export const Success = ({ blogPosts }: CellSuccessProps<BlogPostsQuery>) => {
  return (
    <div className="space-y-10">
      {blogPosts.map((blogPost) => (
        <BlogPost blogPost={blogPost} key={blogPost.id} summary={true} />
      ))}
    </div>
  )
}

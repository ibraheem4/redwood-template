import type { BlogPostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'
import Pagination from 'src/components/Pagination'

export const QUERY = gql`
  query BlogPostsQuery($page: Int) {
    postPage(page: $page) {
      posts {
        id
        title
        body
        createdAt
        user {
          name
        }
      }
      count
    }
  }
`

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page } }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div>Error: {error.message}</div>
)

export const Success = ({ postPage }: CellSuccessProps<BlogPostsQuery>) => {
  const { posts, count } = postPage
  return (
    <div className="space-y-10">
      {posts.map((blogPost) => (
        <BlogPost blogPost={blogPost} key={blogPost.id} summary={true} />
      ))}
      <Pagination count={count} />
    </div>
  )
}

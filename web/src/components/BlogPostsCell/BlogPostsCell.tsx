import type { BlogPostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'
import Pagination from 'src/components/Pagination'
import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'

export const QUERY = gql`
  query BlogPostsQuery($page: Int, $postsPerPage: Int) {
    postPage(page: $page, postsPerPage: $postsPerPage) {
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
      postsPerPage
    }
  }
`

export const beforeQuery = ({
  page,
  postsPerPage = DEFAULT_POSTS_PER_PAGE,
}) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page, postsPerPage } }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div>Error: {error.message}</div>
)

export const Success = ({ postPage }: CellSuccessProps<BlogPostsQuery>) => {
  const { posts, count, postsPerPage } = postPage
  return (
    <div className="space-y-10">
      {posts.map((blogPost) => (
        <BlogPost blogPost={blogPost} key={blogPost.id} summary={true} />
      ))}
      <Pagination count={count} postsPerPage={postsPerPage} />
    </div>
  )
}

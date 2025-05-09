import type { BlogPostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'
import Pagination from 'src/components/Pagination'
import { DEFAULT_POSTS_PER_PAGE } from 'src/utils/constants'

export const QUERY = gql`
  query BlogPostsQuery($page: Int, $postsPerPage: Int) {
    postsPage(page: $page, postsPerPage: $postsPerPage) {
      posts {
        id
        title
        body
        createdAt
        user {
          name
        }
      }
      postsCount
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

export const Loading = () => <div className="dark:text-white">Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div>Error: {error.message}</div>
)

export const Success = ({ postsPage }: CellSuccessProps<BlogPostsQuery>) => {
  const { posts, postsCount, postsPerPage } = postsPage
  return (
    <div className="space-y-10">
      {posts.map((blogPost) => (
        <BlogPost blogPost={blogPost} key={blogPost.id} summary={true} />
      ))}
      <Pagination
        count={postsCount}
        itemsPerPage={postsPerPage}
        routeName="home"
      />
    </div>
  )
}

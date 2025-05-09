import type { Post, User } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import CommentForm from 'src/components/CommentForm'
import CommentsCell from 'src/components/CommentsCell'
import { appendLangToRoute } from 'src/utils/routeUtils'

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

interface Props {
  blogPost: Omit<Post, 'createdAt'> & { user: User }
  summary?: boolean
}

const BlogPost = ({ blogPost, summary = false }: Props) => {
  return (
    <article>
      <header>
        <h2 className="text-xl font-semibold dark:text-white">
          <Link to={appendLangToRoute(routes.blogPost({ id: blogPost.id }))}>
            {blogPost.title}
          </Link>
          <span className="ml-2 font-normal text-gray-400">
            by {blogPost.user.name}
          </span>
        </h2>
      </header>
      <div className="mt-2 text-gray-900 dark:text-gray-500">
        {summary ? truncate(blogPost.body, 100) : blogPost.body}
      </div>
      {!summary && (
        <div className="mt-12">
          <CommentForm postId={blogPost.id} />
          <div className="mt-12">
            <CommentsCell postId={blogPost.id} />
          </div>
        </div>
      )}
    </article>
  )
}

export default BlogPost

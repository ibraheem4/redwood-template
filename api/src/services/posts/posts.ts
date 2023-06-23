import type { QueryResolvers, PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { DEFAULT_POSTS_PER_PAGE, DEFAULT_POSTS_PAGE } from 'src/utils/constants'

export const postPage: QueryResolvers['postPage'] = async ({
  page = DEFAULT_POSTS_PAGE,
  postsPerPage = DEFAULT_POSTS_PER_PAGE,
}) => {
  const offset = (page - 1) * postsPerPage

  const posts = await db.post.findMany({
    take: postsPerPage,
    skip: offset,
    orderBy: { createdAt: 'desc' },
  })

  const postsCount = await db.post.count()

  return {
    posts,
    postsCount,
    postsPerPage,
  }
}

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
    include: {
      user: true,
    },
  })
}

export const Post: PostRelationResolvers = {
  user: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).user(),
}

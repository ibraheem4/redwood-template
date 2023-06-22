import type { QueryResolvers, PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { DEFAULT_POSTS_PER_PAGE, DEFAULT_POSTS_PAGE } from 'src/utils/constants'

export const postPage = ({
  page = DEFAULT_POSTS_PAGE,
  postsPerPage = DEFAULT_POSTS_PER_PAGE,
}) => {
  const offset = (page - 1) * postsPerPage //

  return {
    posts: db.post.findMany({
      take: postsPerPage,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.post.count(),
    postsPerPage,
  }
}

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  user: (_obj, { root }) =>
    db.post.findFirst({ where: { id: root.id } }).user(),
}

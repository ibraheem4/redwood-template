import type { QueryResolvers, PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const POSTS_PER_PAGE = 5

export const postPage = ({ page = 1 }) => {
  const offset = (page - 1) * POSTS_PER_PAGE

  return {
    posts: db.post.findMany({
      take: POSTS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.post.count(),
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

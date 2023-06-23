import type { Post } from '@prisma/client'

import { createPost, updatePost, deletePost } from '../adminPosts/adminPosts'

import { posts, post } from './posts'
import type { StandardScenario } from './posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario('returns all posts', async (scenario: StandardScenario) => {
    const result = await posts()

    expect(result.length).toEqual(Object.keys(scenario.post).length)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(expect.objectContaining(scenario.post.one))
  })

  scenario('creates a post', async () => {
    mockCurrentUser({
      roles: ['admin'],
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'admin@admin.com',
    })

    const result = await createPost({
      input: { title: 'String', body: 'String' },
    })

    expect(result.body).toEqual('String')
    expect(result.title).toEqual('String')
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = (await post({ id: scenario.post.one.id })) as Post
    const result = await updatePost({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = (await deletePost({ id: scenario.post.one.id })) as Post
    const result = await post({ id: original.id })

    expect(result).toEqual(null)
  })
})

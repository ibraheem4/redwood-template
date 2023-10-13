import {
  adminPosts,
  adminPost,
  createPost,
  updatePost,
  deletePost,
} from './adminPosts'
import type { StandardScenario } from './adminPosts.scenarios'

describe('posts', () => {
  beforeEach(() => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'email@email.com',
      roles: ['admin'],
    })
  })

  scenario(
    'updates and verifies a post',
    async (scenario: StandardScenario) => {
      const original = await adminPost({ id: scenario.post.one.id })
      const updatedPost = await updatePost({
        id: original.id,
        input: { title: 'UpdatedTitle' },
      })
      expect(updatedPost.title).toEqual('UpdatedTitle')

      // Fetch again to verify
      const verifyPost = await adminPost({ id: original.id })
      expect(verifyPost.title).toEqual('UpdatedTitle')
    }
  )

  scenario('returns all posts for the given user', async () => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'email@email.com',
      roles: ['admin'],
    })

    const result = await adminPosts()

    expect(result.length).toEqual(1)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'email@email.com',
      roles: ['admin'],
    })

    const result = await adminPost({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })

  scenario('creates a post', async () => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'email@email.com',
      roles: ['admin'],
    })

    const result = await createPost({
      input: { title: 'String', body: 'String' },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a post', async (scenario: StandardScenario) => {
    const original = await adminPost({ id: scenario.post.one.id })
    const result = await updatePost({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a post', async (scenario: StandardScenario) => {
    const original = await deletePost({ id: scenario.post.one.id })
    const result = await adminPost({ id: original.id })

    expect(result).toEqual(null)
  })
})

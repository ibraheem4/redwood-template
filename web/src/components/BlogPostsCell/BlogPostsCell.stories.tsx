import type { StoryFn } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './BlogPostsCell'
import { standard } from './BlogPostsCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure: StoryFn<typeof Failure> = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
}

export const success: StoryFn<typeof Success> = () => {
  return Success ? (
    <Success
      postsPage={{
        posts: standard().postsPage.posts,
        postsCount: standard().postsPage.postsCount,
        postsPerPage: standard().postsPage.postsPerPage,
      }}
    />
  ) : null
}

export default { title: 'Cells/BlogPostsCell' }

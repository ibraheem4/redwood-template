// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Comment> = (args) => {
//   return <Comment {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import Comment from './Comment'

export const defaultView = () => {
  return (
    <Comment
      comment={{
        id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        postId: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      }}
    />
  )
}

export const moderatorView = () => {
  mockCurrentUser({
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
    email: 'moderator@moderator.com',
    roles: ['moderator'],
  })

  return (
    <Comment
      comment={{
        id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        postId: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      }}
    />
  )
}

export const adminView = () => {
  mockCurrentUser({
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
    email: 'admin@admin.com',
    roles: ['admin'],
  })

  return (
    <Comment
      comment={{
        id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        createdAt: '2020-01-01T12:34:56Z',
        postId: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      }}
    />
  )
}

export default {
  title: 'Components/Comment',
  component: Comment,
} as Meta<typeof Comment>

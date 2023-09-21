import type { Meta, ComponentStory } from '@storybook/react'

import BlogLayout from './BlogLayout'

export const loggedIn: ComponentStory<typeof BlogLayout> = (args) => {
  mockCurrentUser({
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
    email: 'rob@redwoodjs.com',
    roles: ['user'],
  })

  return <BlogLayout {...args} />
}

export const loggedOut: ComponentStory<typeof BlogLayout> = (args) => {
  return <BlogLayout {...args} />
}

export default {
  title: 'Layouts/BlogLayout',
  component: BlogLayout,
} as Meta<typeof BlogLayout>

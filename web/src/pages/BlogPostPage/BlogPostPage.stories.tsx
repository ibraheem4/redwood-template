import type { Meta } from '@storybook/react'

import BlogPostPage from './BlogPostPage'

export const generated = () => {
  return <BlogPostPage id="5e1923f3-e84c-4603-90a6-18302f95a6f9" />
}

export default {
  title: 'Pages/BlogPostPage',
  component: BlogPostPage,
} as Meta<typeof BlogPostPage>

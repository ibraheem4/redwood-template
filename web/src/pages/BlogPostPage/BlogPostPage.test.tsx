import { render } from '@redwoodjs/testing/web'

import BlogPostPage from './BlogPostPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BlogPostPage', () => {
  const blogPost = {
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  }
  it('renders successfully', () => {
    expect(() => {
      render(<BlogPostPage id={blogPost.id} />)
    }).not.toThrow()
  })
})

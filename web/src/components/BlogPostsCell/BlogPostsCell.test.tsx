import { render, screen, within } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './BlogPostsCell'
import { standard } from './BlogPostsCell.mock'

describe('BlogPostsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    const { postPage } = standard()
    const { posts } = postPage

    render(<Success postPage={postPage} />)

    posts.forEach((blogPost) => {
      const truncatedBody = blogPost.body.substring(0, 10)
      const matchedBody = screen.getByText(truncatedBody, { exact: false })
      const ellipsis = within(matchedBody).getByText('...', { exact: false })

      expect(screen.getByText(blogPost.title)).toBeInTheDocument()
      expect(screen.queryByText(blogPost.body)).not.toBeInTheDocument()
      expect(matchedBody).toBeInTheDocument()
      expect(ellipsis).toBeInTheDocument()
    })
  })
})

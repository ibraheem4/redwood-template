import { render, screen, waitFor } from '@redwoodjs/testing'

import { standard } from 'src/components/CommentsCell/CommentsCell.mock'

import BlogPost from './BlogPost'

const BLOG_POST = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  title: 'First post',
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
  createdAt: new Date().toISOString(),
  user: {
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
    name: 'String',
    email: 'String',
    hashedPassword: 'String',
    salt: 'String',
    roles: ['String'],
    posts: [
      {
        id: '5e1923f3-e84c-4603-90a6-18302f95a6f9',
        title: 'Second post',
        body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
        createdAt: new Date().toISOString(),
        user: {
          id: '5e1923f3-e84c-4603-90a6-18302f95a6f9',
          name: 'String',
          email: 'String',
          hashedPassword: 'String',
          salt: 'String',
          roles: ['String'],
          posts: [],
        },
      },
    ],
  },
}

describe('BlogPost', () => {
  it('renders a blog post', () => {
    render(<BlogPost blogPost={BLOG_POST} />)

    expect(screen.getByText(BLOG_POST.title)).toBeInTheDocument()
    expect(screen.getByText(BLOG_POST.body)).toBeInTheDocument()
  })

  it('renders comments when displaying a full blog post', async () => {
    const comment = standard().comments[0]
    render(<BlogPost blogPost={BLOG_POST} />)

    await waitFor(() =>
      expect(screen.getByText(comment.body)).toBeInTheDocument()
    )
  })

  it('renders a summary of a blog post', () => {
    render(<BlogPost blogPost={BLOG_POST} summary={true} />)

    expect(screen.getByText(BLOG_POST.title)).toBeInTheDocument()
    expect(
      screen.getByText(
        'Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Str...'
      )
    ).toBeInTheDocument()
  })

  it('renders a summary of a blog post when summary is set to false', () => {
    render(<BlogPost blogPost={BLOG_POST} summary={false} />)

    expect(screen.getByText(BLOG_POST.title)).toBeInTheDocument()
    expect(screen.getByText(BLOG_POST.body)).toBeInTheDocument()
  })

  it('does not render comments when displaying a summary', async () => {
    const comment = standard().comments[0]
    render(<BlogPost blogPost={BLOG_POST} summary={true} />)

    await waitFor(() =>
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument()
    )
  })
})

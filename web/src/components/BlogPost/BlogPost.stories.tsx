import BlogPost from './BlogPost'

const BLOG_POST = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  title: 'First Post',
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
  user: {
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f9',
    name: 'String',
    email: 'mock+test1@email.com',
    hashedPassword: 'String',
    salt: 'String',
    roles: ['String'],
    posts: [],
  },
}

export const full = () => {
  return <BlogPost blogPost={BLOG_POST} />
}

export const summary = () => {
  return <BlogPost blogPost={BLOG_POST} summary={true} />
}

export default { title: 'Components/BlogPost' }

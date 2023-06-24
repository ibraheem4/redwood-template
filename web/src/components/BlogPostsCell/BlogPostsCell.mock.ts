// Define your own mock data here:
export const standard = () => {
  return {
    postPage: {
      posts: [
        {
          id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
          title: 'First Post',
          body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
          createdAt: '2020-01-01T12:34:56Z',
          user: {
            email: 'one@one.com',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        {
          id: '5e1923f3-e84c-4603-90a6-18302f95a6f7',
          title: 'Second Post',
          body: `Master cleanse gentrify irony put a bird on it hexagon enamel pin. Pop-up man braid artisan pug tilde synth lo-fi. Ethical tofu portland keytar waistcoat. Pabst authentic hammock chillwave twee trust fund. Lyft humblebrag ramps irony unicorn.`,
          createdAt: '2020-01-01T12:34:56Z',
          user: {
            email: 'two@two.com',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      ],
      postsCount: 2,
      postsPerPage: 5,
    },
  }
}

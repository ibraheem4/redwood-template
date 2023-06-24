export const schema = gql`
  type Post {
    id: String!
    title: String!
    body: String!
    createdAt: DateTime!
    user: User!
  }

  type PostPage {
    posts: [Post!]!
    postsCount: Int!
    postsPerPage: Int!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @skipAuth
    postsPage(page: Int, postsPerPage: Int): PostPage! @skipAuth
  }
`

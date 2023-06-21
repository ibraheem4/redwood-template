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
    count: Int!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @skipAuth
    postPage(page: Int): PostPage! @skipAuth
  }
`

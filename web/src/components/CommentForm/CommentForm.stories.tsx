import type {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from 'types/graphql'

import CommentForm from './CommentForm'

const BLOG_POST = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
}

export const generated = () => {
  mockGraphQLMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    'CreateCommentMutation',
    (variables, { ctx }) => {
      const id = '5e1923f3-e84c-4603-90a6-18302f95a6f9'
      ctx.delay(1000)

      return {
        createComment: {
          id,
          name: variables.input.name,
          body: variables.input.body,
          createdAt: new Date().toISOString(),
        },
      }
    }
  )

  return <CommentForm postId={BLOG_POST.id} />
}

export default { title: 'Components/CommentForm' }

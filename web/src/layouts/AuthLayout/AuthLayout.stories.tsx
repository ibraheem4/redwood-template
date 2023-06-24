import type { ComponentMeta, ComponentStory } from '@storybook/react'

import AuthLayout from './AuthLayout'

export const generated: ComponentStory<typeof AuthLayout> = (args) => {
  return <AuthLayout {...args} />
}

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
} as ComponentMeta<typeof AuthLayout>

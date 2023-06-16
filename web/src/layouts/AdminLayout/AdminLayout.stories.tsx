import type { ComponentMeta, ComponentStory } from '@storybook/react'

import AdminLayout from './AdminLayout'

export const generated: ComponentStory<typeof AdminLayout> = (args) => {
  return <AdminLayout {...args} />
}

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
} as ComponentMeta<typeof AdminLayout>

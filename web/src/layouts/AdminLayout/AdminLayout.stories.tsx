import type { Meta, ComponentStory } from '@storybook/react'

import AdminLayout from './AdminLayout'

export const generated: ComponentStory<typeof AdminLayout> = (args) => {
  return <AdminLayout {...args} />
}

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
} as Meta<typeof AdminLayout>

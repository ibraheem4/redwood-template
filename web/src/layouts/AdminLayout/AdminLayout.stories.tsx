import type { Meta, StoryFn } from '@storybook/react'

import AdminLayout from './AdminLayout'

export const generated: StoryFn<typeof AdminLayout> = (args) => {
  return <AdminLayout {...args} />
}

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
} as Meta<typeof AdminLayout>

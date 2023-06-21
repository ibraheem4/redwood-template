import type { ComponentMeta } from '@storybook/react'

import Pagination from './Pagination'

export const generated = (args) => {
  return <Pagination {...args} />
}

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

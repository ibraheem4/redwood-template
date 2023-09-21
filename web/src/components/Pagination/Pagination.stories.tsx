import type { Meta, StoryFn } from '@storybook/react'

import Pagination from './Pagination'

export const Default: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

Default.args = {
  count: 30,
  itemsPerPage: 5,
  routeName: 'home',
}

export const MorePages: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

MorePages.args = {
  count: 100,
  itemsPerPage: 5,
  routeName: 'home',
}

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>

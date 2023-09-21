import type { Meta, ComponentStory } from '@storybook/react'

import Pagination from './Pagination'

export const Default: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

Default.args = {
  count: 30,
  itemsPerPage: 5,
  routeName: 'home',
}

export const MorePages: ComponentStory<typeof Pagination> = (args) => {
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

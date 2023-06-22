import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Pagination from './Pagination'

export const Default: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

Default.args = {
  count: 30,
  postsPerPage: 5,
}

export const MorePages: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

MorePages.args = {
  count: 100,
  postsPerPage: 5,
}

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

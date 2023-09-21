import type { Meta, StoryFn } from '@storybook/react'

import TranslatedMetaTags from './TranslatedMetaTags'

export const generated: StoryFn<typeof TranslatedMetaTags> = (args) => {
  return <TranslatedMetaTags {...args} />
}

export default {
  title: 'Components/TranslatedMetaTags',
  component: TranslatedMetaTags,
} as Meta<typeof TranslatedMetaTags>

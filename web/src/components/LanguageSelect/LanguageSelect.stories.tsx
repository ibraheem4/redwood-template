// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { StoryFn } from '@storybook/react'
//
// export const generated: StoryFn<typeof LanguageSelect> = (args) => {
//   return <LanguageSelect {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import LanguageSelect from './LanguageSelect'

export const generated = () => {
  return <LanguageSelect />
}

export default {
  title: 'Components/LanguageSelect',
  component: LanguageSelect,
} as Meta<typeof LanguageSelect>

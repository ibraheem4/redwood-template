// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LanguageSelect> = (args) => {
//   return <LanguageSelect {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LanguageSelect from './LanguageSelect'

export const generated = () => {
  return <LanguageSelect />
}

export default {
  title: 'Components/LanguageSelect',
  component: LanguageSelect,
} as ComponentMeta<typeof LanguageSelect>

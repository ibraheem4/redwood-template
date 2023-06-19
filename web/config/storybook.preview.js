import * as React from 'react'

import { I18nextProvider } from 'react-i18next'
import i18n from 'web/src/i18n'

import { languageCodes } from '../src/utils/languageCodes'
/** @type { import("@storybook/csf").GlobalTypes } */
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: Object.keys(languageCodes).map((languageCode) => ({
        value: languageCode,
        right: languageCodes[languageCode].emoji,
        title: languageCodes[languageCode].title,
      })),
    },
  },
}
/**
 * An example, no-op storybook decorator. Use a function like this to create decorators.
 * @param { import("@storybook/addons").StoryFn} StoryFn
 * @param { import("@storybook/addons").StoryContext} context
 * @returns StoryFn, unmodified.
 */
const _exampleDecorator = (StoryFn, _context) => {
  return <StoryFn />
}
/**
 * We're following Storybook's naming convention here. See for example
 * https://github.com/storybookjs/addon-kit/blob/main/src/withGlobals.ts
 * Unfortunately that will make eslint complain, so we have to disable it when
 * using a hook below
 *
 * @param { import("@storybook/addons").StoryFn} StoryFn
 * @param { import("@storybook/addons").StoryContext} context
 * @returns a story wrapped in an I18nextProvider
 */
const withI18n = (StoryFn, context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    i18n.changeLanguage(context.globals.locale)
  }, [context.globals.locale])
  return (
    <I18nextProvider i18n={i18n}>
      <div style={{ margin: '48px' }}>
        <StoryFn />
      </div>
    </I18nextProvider>
  )
}
export const decorators = [withI18n]

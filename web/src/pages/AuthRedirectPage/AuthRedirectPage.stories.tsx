import type { Meta, StoryObj } from '@storybook/react'

import AuthRedirectPage from './AuthRedirectPage'

const meta: Meta<typeof AuthRedirectPage> = {
  component: AuthRedirectPage,
}

export default meta

type Story = StoryObj<typeof AuthRedirectPage>

export const Primary: Story = {}

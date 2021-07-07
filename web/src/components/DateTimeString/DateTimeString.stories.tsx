import { Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import DateTimeString from './DateTimeString'

export default {
  component: DateTimeString,
  title: 'Components/DateTimeString',
  argTypes: {
    date: { control: { type: 'date' } },
    locale: {
      control: {
        type: 'select',
        options: ['en-au', 'en-us', 'en-gb', 'zh-TW', 'ja', 'zh-cn']
      }
    },
    options: {
      control: {
        type: 'object'
      }
    }
  }
}

const Template: Story<ComponentProps<typeof DateTimeString>> = (args) => (
  <DateTimeString {...args} />
)

export const Basic = Template.bind({})

Basic.args = {
  date: new Date(),
  locale: navigator.language,
  options: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  }
}

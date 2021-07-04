import { render } from '@redwoodjs/testing'

import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeString />)
    }).not.toThrow()
  })
})

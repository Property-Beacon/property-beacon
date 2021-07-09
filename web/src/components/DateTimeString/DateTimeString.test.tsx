import { render, screen } from '@redwoodjs/testing'
import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  const date = '2020-01-01T00:00:00'

  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeString date={date} locale="en-AU" />)
    }).not.toThrow()
    const element = screen.getByText('01/01/2020, 12:00:00 am AEDT')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })

  it('renders date string only', () => {
    render(
      <DateTimeString
        date={date}
        locale="en-AU"
        options={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
      />
    )
    const element = screen.getByText('01/01/2020')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })

  it('renders time string only', () => {
    render(
      <DateTimeString
        date={date}
        locale="en-AU"
        options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
      />
    )
    const element = screen.getByText('12:00:00 am')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })
})

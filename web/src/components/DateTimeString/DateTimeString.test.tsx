import { render, screen } from '@redwoodjs/testing'
import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  const date = new Date(Date.UTC(2020, 0, 1, 0, 0, 0))

  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeString date={date} locale="en-AU" />)
    }).not.toThrow()
    const element = screen.getByText('01/01/2020, 11:00:00 am AEDT')

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
    const element = screen.getByText('11:00:00 am')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })
})

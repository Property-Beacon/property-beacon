import { render, screen } from '@redwoodjs/testing'
import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  const date = new Date('2020-01-01')

  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeString date={date} locale="en-au" />)
    }).not.toThrow()
    const element = screen.getByText('01/01/2020, 11:00:00 am AEDT')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })

  it('renders date string only', () => {
    render(
      <DateTimeString
        date={date}
        locale="en-au"
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
        locale="en-au"
        options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
      />
    )
    const element = screen.getByText('11:00:00 am')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })
})

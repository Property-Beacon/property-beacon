import { render, screen } from '@redwoodjs/testing'
import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  const date = '2020-01-01T00:00:00.000Z'

  it('renders successfully', () => {
    expect(() => {
      render(
        <DateTimeString
          date={date}
          options={{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hourCycle: 'h24',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'UTC'
          }}
        />
      )
    }).not.toThrow()
    const element = screen.getByText('01/01/2020, 24:00:00 UTC')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })

  it('renders date string only', () => {
    render(
      <DateTimeString
        date={date}
        options={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
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
        options={{
          hour: '2-digit',
          hourCycle: 'h24',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
          timeZone: 'UTC'
        }}
      />
    )
    const element = screen.getByText('24:00:00 UTC')

    expect(element).not.toBeUndefined()
    expect(element).toMatchSnapshot()
  })
})

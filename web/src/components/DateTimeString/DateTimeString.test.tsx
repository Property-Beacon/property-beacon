import { render } from '@redwoodjs/testing'
import DateTimeString from './DateTimeString'

describe('DateTimeString', () => {
  const date = '2020-01-01T00:00:00'

  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeString date={date} />)
    }).not.toThrow()
    // const element = screen.getByText(new Date(date).toString())

    // expect(element).not.toBeUndefined()
    // expect(element).toMatchSnapshot()
  })

  // it('renders date string only', () => {
  //   render(
  //     <DateTimeString
  //       date={date}
  //       options={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
  //     />
  //   )
  //   const element = screen.getByText('01/01/2020')

  //   expect(element).not.toBeUndefined()
  //   expect(element).toMatchSnapshot()
  // })

  // it('renders time string only', () => {
  //   render(
  //     <DateTimeString
  //       date={date}
  //       options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
  //     />
  //   )
  //   const element = screen.getByText('12:00:00 am')

  //   expect(element).not.toBeUndefined()
  //   expect(element).toMatchSnapshot()
  // })
})

import { render, screen } from '@redwoodjs/testing'
import { Empty, Failure, Loading, Success } from './CompanyLogoCell'
import { standard } from './CompanyLogoCell.mock'

describe('CompanyLogoCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
    expect(screen.getByTestId('company-logo-cell-loading')).toMatchSnapshot()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
    expect(screen.getByTestId('company-logo-cell-initials')).toMatchSnapshot()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
    expect(screen.getByTestId('company-logo-cell-error')).toMatchSnapshot()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success {...standard()} />)
    }).not.toThrow()

    expect(screen.getByTestId('company-logo-cell')).toMatchSnapshot()
  })

  it('renders initials with the ?', async () => {
    render(
      <Success
        {...standard({
          name: '',
          shortName: '',
          displayName: ''
        })}
      />
    )
    const text = screen.getByTestId('company-logo-cell-initials').textContent

    expect(text).toEqual('?')
  })

  it('renders initials with the first character of displayName', async () => {
    render(
      <Success
        {...standard({
          name: 'C Company',
          shortName: 'B Company',
          displayName: 'A Company'
        })}
      />
    )
    const text = screen.getByTestId('company-logo-cell-initials').textContent

    expect(text).toEqual('A')
  })

  it('renders initials with the first character of name', async () => {
    render(
      <Success
        {...standard({
          name: 'B Company',
          shortName: '',
          displayName: ''
        })}
      />
    )
    const text = screen.getByTestId('company-logo-cell-initials').textContent

    expect(text).toEqual('B')
  })

  it('renders initials with the first character of shortName', async () => {
    render(
      <Success
        {...standard({
          name: '',
          shortName: 'C Company',
          displayName: ''
        })}
      />
    )
    const text = screen.getByTestId('company-logo-cell-initials').textContent

    expect(text).toEqual('C')
  })

  it('renders company logo', async () => {
    render(<Success {...standard()} />)

    expect(screen.getByTestId('company-logo-cell-img')).toMatchSnapshot()
  })
})

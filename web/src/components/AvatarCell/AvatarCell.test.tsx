import { render, screen } from '@redwoodjs/testing'
import { Empty, Failure, Loading, Success } from './AvatarCell'
import { standard } from './AvatarCell.mock'

describe('AvatarCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
    expect(screen.getByTestId('avatar-cell-loading')).toMatchSnapshot()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
    expect(screen.getByTestId('avatar-cell-initials')).toMatchSnapshot()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
    expect(screen.getByTestId('avatar-cell-error')).toMatchSnapshot()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success {...standard()} />)
    }).not.toThrow()
    expect(screen.getByTestId('avatar-cell')).toMatchSnapshot()
  })

  it('renders initials with the first character of email address', async () => {
    render(
      <Success
        {...standard({
          email: 'david@domain.com',
          profile: {
            id: '973cf2d6-e058-11eb-ba80-0242ac130004'
          }
        })}
      />
    )
    const text = screen.getByTestId('avatar-cell-initials').textContent

    expect(text).toEqual('D')
  })

  it('renders initials with the firstName and lastName', async () => {
    render(
      <Success
        {...standard({
          email: 'david@domain.com',
          profile: {
            firstName: 'John',
            lastName: 'Smith',
            id: '973cf2d6-e058-11eb-ba80-0242ac130004'
          }
        })}
      />
    )
    const text = screen.getByTestId('avatar-cell-initials').textContent

    expect(text).toEqual('JS')
  })

  it('renders avatar image', async () => {
    render(
      <Success
        {...standard({
          email: 'david@domain.com',
          profile: {
            firstName: 'John',
            lastName: 'Smith',
            id: '973cf2d6-e058-11eb-ba80-0242ac130004',
            avatar: 'https://cdn.filestackcontent.com/fpWIVZz7RSSdjY4pn5YP'
          }
        })}
      />
    )

    expect(screen.getByTestId('avatar-cell-img')).toMatchSnapshot()
  })
})

import { render, screen } from '@redwoodjs/testing'
import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout />)
    }).not.toThrow()

    const navbarLogo = screen.getByTestId('navbar-logo')

    expect(navbarLogo).toBeVisible()
    expect(navbarLogo).toMatchSnapshot()
    expect(screen.getByText('Loading')).toBeVisible()
  })

  it('renders AvatarCell error fetching user data', async () => {
    const dateStr = new Date().toLocaleString()

    mockCurrentUser({
      id: 'a3f08caa-e057-11eb-ba80-0242ac130004',
      role: 'ADMIN',
      firstName: 'David',
      lastName: 'Smith',
      email: 'example@domain.com',
      logOn: dateStr,
      logOff: dateStr,
      createdAt: dateStr
    })

    mockGraphQLQuery('GetUserById', (_, { ctx }) => {
      // @ts-expect-error Incorrect GraphQLContext type
      ctx.error({ message: 'Error' })

      return null
    })

    render(<MainLayout />)

    expect(await screen.findByTestId('avatar-cell-error')).toBeVisible()
    expect(await screen.findByTestId('navbar-menu')).toBeVisible()
    expect(await screen.findByTestId('navbar-menu-user')).toBeInTheDocument()
    expect(await screen.findByTestId('navbar-menu-logout')).toBeInTheDocument()
    expect(
      await screen.findByTestId('navbar-menu-user-fullname')
    ).toHaveTextContent('n/a')
    expect(
      await screen.findByTestId('navbar-menu-user-role')
    ).toHaveTextContent('ADMIN')
    expect(
      await screen.findByTestId('navbar-menu-user-email')
    ).toHaveTextContent('example@domain.com')
  })

  // TODO: success mockGraphQLQuery test, currently run into data is null unknown issue
})

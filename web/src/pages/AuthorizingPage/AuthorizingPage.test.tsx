import { render } from '@redwoodjs/testing'

import AuthorizingPage from './AuthorizingPage'

describe('AuthorizingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthorizingPage />)
    }).not.toThrow()
  })
})

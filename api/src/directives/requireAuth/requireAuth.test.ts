import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'
import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // If you want to set values in context, pass it through e.g.
    // mockRedwoodDirective(requireAuth, { context: { currentUser: { id: 1, name: 'Lebron McGretzky' } }})
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          firstName: 'YP',
          lastName: 'Liu',
          id: '73bcfad1-8133-406d-b7ac-2d22ccaf62a9'
        }
      }
    })

    expect(mockExecution).not.toThrowError()
  })
})
import { render } from '@redwoodjs/testing'
import ImageUploaderOverlay from './ImageUploaderOverlay'

describe('ImageUploaderOverlay', () => {
  const mockFn = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <ImageUploaderOverlay
          onClose={mockFn}
          onSuccess={mockFn}
          onError={mockFn}
        />
      )
    }).not.toThrow()
  })
})

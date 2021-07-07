import { render } from '@redwoodjs/testing'

import ImageUploaderOverlay from './ImageUploaderOverlay'

describe('ImageUploaderOverlay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageUploaderOverlay />)
    }).not.toThrow()
  })
})

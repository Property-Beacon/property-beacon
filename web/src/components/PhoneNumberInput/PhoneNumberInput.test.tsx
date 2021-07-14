import { fireEvent, render, screen } from '@redwoodjs/testing'
import PhoneNumberInput from './PhoneNumberInput'

describe('PhoneNumberInput', () => {
  const mockFn = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <div data-testid="phone-number-input-root">
          <PhoneNumberInput value="" onChange={mockFn} defaultCountry="AU" />
        </div>
      )
    }).not.toThrow()

    expect(screen.getByTestId('phone-number-input-root')).toMatchSnapshot()
    expect(screen.getByAltText('Australia')).toBeInTheDocument()
    expect(
      screen.getByTestId('phone-number-input').previousSibling
    ).toHaveClass('PhoneInputCountry')
    expect(screen.getByTestId('phone-number-input')).toHaveValue('+61')
  })

  test('renders country flag on input national code', () => {
    render(<PhoneNumberInput value="" onChange={mockFn} />)

    fireEvent.change(screen.getByTestId('phone-number-input'), {
      target: { value: '+81' }
    })

    expect(mockFn).toHaveBeenCalled()
    expect(screen.getByTestId('phone-number-input')).toHaveValue('+81')
    expect(screen.getByAltText('Japan')).toBeInTheDocument()
  })
})

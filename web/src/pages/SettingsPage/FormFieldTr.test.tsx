import { Form } from '@redwoodjs/forms'
import { render, screen } from '@redwoodjs/testing'
import FormFieldTr from './FormFieldTr'

describe('FormFieldTr', () => {
  const mockFn = jest.fn()

  it('renders successfully', () => {
    expect(() => {
      render(
        <Form onSubmit={mockFn} data-testid="test-form">
          <table>
            <tbody>
              <FormFieldTr name="firstName" label="First name" />
            </tbody>
          </table>
        </Form>
      )
    }).not.toThrow()

    expect(screen.getByTestId('test-form')).toMatchSnapshot()
    expect(screen.getByTestId('form-field-tr-th')).toHaveTextContent(
      'First name'
    )
    expect(screen.getByTestId('form-field-tr-label')).toHaveTextContent(
      'First name'
    )
  })

  it('renders customized children', () => {
    expect(() => {
      render(
        <Form onSubmit={mockFn}>
          <table>
            <tbody>
              <FormFieldTr name="address" label="Address">
                <div data-testid="custom-children">Custom Children</div>
              </FormFieldTr>
            </tbody>
          </table>
        </Form>
      )
    }).not.toThrow()

    expect(screen.getByTestId('custom-children')).not.toBeUndefined()
  })
})

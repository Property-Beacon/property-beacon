import { Form } from '@redwoodjs/forms'
import { render } from '@redwoodjs/testing'
import { useForm } from 'react-hook-form'
import type { Address } from 'web/types/graphql'
import GoogleAddressForm from './GoogleAddressForm'

const GoogleAddressFormWrapper = () => {
  const formMethods = useForm<Address>()

  return (
    <Form
      formMethods={formMethods}
      onSubmit={(v) => {
        console.info(v)
      }}
    >
      <GoogleAddressForm address={{}} />
    </Form>
  )
}

// TODO more test coverage
describe('GoogleAddressForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GoogleAddressFormWrapper />)
    }).not.toThrow()
  })
})

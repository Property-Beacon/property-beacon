import { Form } from '@redwoodjs/forms'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { Address } from 'web/types/graphql'
import GoogleAddressForm from './GoogleAddressForm'

const GoogleAddressFormWrapper = () => {
  const formMethods = useForm<Address>()

  return (
    <Form
      className="w-1/2"
      formMethods={formMethods}
      onSubmit={(v) => {
        console.info(v)
      }}
      config={{ mode: 'onBlur' }}
    >
      <GoogleAddressForm address={{}} />
    </Form>
  );
}

// TODO Find a way to be abel to demo search address on Storybook
export const disabled = () => {
  return <GoogleAddressFormWrapper />
}

export default { title: 'Components/GoogleAddressForm' }

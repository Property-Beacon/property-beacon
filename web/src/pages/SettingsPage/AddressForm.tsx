import { FieldError, TextField } from '@redwoodjs/forms'
import { FormProvider, useFormContext } from 'react-hook-form'
import type { Address } from 'web/types/graphql'
import FormFieldTr from './FormFieldTr'

interface Props {
  loading: boolean
  address: Address
  context?: string
}

const AddressForm = ({ loading, address }: Props) => {
  // TODO: Workaround of FieldError only can retrieve the first layer
  const { errors, ...methods } = useFormContext()

  return (
    <FormProvider {...methods} errors={errors?.['address'] || errors}>
      <FormFieldTr name="address.name" label="Name">
        <TextField
          name="address.name"
          disabled={loading}
          placeholder="e.g. My house"
          defaultValue={address?.name}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError name="name" className="mt-1 label-text-alt text-error" />
      </FormFieldTr>
      <FormFieldTr name="address.street" label="Street">
        <TextField
          name="address.street"
          disabled={loading}
          placeholder="e.g. 120/20 George St."
          defaultValue={address?.street}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError name="street" className="mt-1 label-text-alt text-error" />
      </FormFieldTr>
      <FormFieldTr name="address.suburb" label="Suburb">
        <TextField
          name="address.suburb"
          disabled={loading}
          placeholder="e.g. Sydney"
          defaultValue={address?.suburb}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError name="suburb" className="mt-1 label-text-alt text-error" />
      </FormFieldTr>
      <FormFieldTr name="address.state" label="State">
        <TextField
          name="address.state"
          disabled={loading}
          placeholder="e.g. NSW"
          defaultValue={address?.state}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError name="state" className="mt-1 label-text-alt text-error" />
      </FormFieldTr>
      <FormFieldTr name="address.postalCode" label="Postal code">
        <TextField
          name="address.postalCode"
          disabled={loading}
          placeholder="e.g. 2200"
          validation={{ pattern: /^[0-9]+$/i }}
          defaultValue={address?.postalCode}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError
          name="postalCode"
          className="mt-1 label-text-alt text-error"
        />
      </FormFieldTr>
      <FormFieldTr name="address.country" label="Country">
        <TextField
          name="address.country"
          disabled={loading}
          placeholder="e.g. Australia"
          validation={{ pattern: /^[A-Za-z]+$/i }}
          defaultValue={address?.country}
          className="input input-sm input-bordered w-full"
          errorClassName="input input-bordered input-error"
        />
        <FieldError name="country" className="mt-1 label-text-alt text-error" />
      </FormFieldTr>
    </FormProvider>
  )
}
export default AddressForm

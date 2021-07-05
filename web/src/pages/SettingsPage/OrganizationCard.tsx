import { useApolloClient } from '@apollo/client'
import {
  EmailField,
  FieldError,
  Form,
  TelField,
  TextField,
  UrlField
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import CompanyLogoCell, { QUERY } from 'src/components/CompanyLogoCell'
import type { GetCompany, GetCompanyVariables } from 'web/types/graphql'
import FormFieldTr from './FormFieldTr'

interface Props {
  companyId: string
}

const OrganizationCard = ({ companyId }: Props) => {
  const { watchQuery } = useApolloClient()
  const [company, setCompany] = useState<GetCompany['company']>()
  const loading = false
  const handleSubmit = (data) => {
    console.log(data)
  }

  useEffect(
    () => {
      watchQuery<GetCompany, GetCompanyVariables>({
        query: QUERY,
        variables: { id: companyId },
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first'
      }).subscribe(({ data: { company } }) => {
        setCompany(company)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex gap-10 flex-col lg:flex-row lg:items-start mt-10">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Organization Information</div>
            <div className="h-28 w-28 text-4xl mx-auto mt-10 mb-6">
              <CompanyLogoCell id={companyId} />
            </div>
            <table className="table table-zebra w-full">
              <tbody>
                <FormFieldTr name="name" label="Name">
                  <TextField
                    name="name"
                    disabled={loading}
                    placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                    defaultValue={company?.name}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="name"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="shortName" label="Short name">
                  <TextField
                    name="shortName"
                    disabled={loading}
                    placeholder="e.g. NSW ECUMENICAL"
                    defaultValue={company?.shortName}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="shortName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="displayName" label="Display name">
                  <TextField
                    name="displayName"
                    disabled={loading}
                    placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                    defaultValue={company?.displayName}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="displayName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="website" label="Website">
                  <UrlField
                    name="website"
                    disabled={loading}
                    placeholder="e.g. https://www.example.com"
                    defaultValue={company?.website}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="website"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.fullName" label="Full name">
                  <TextField
                    name="profile.fullName"
                    disabled={loading}
                    placeholder="e.g. NEW SOUTH WALES ECUMENICAL COUNCIL INCORPORATED"
                    defaultValue={company?.profile?.fullName}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.fullName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.abn" label="ABN">
                  <TextField
                    name="profile.abn"
                    disabled={loading}
                    placeholder="e.g. 64 781 737 080"
                    defaultValue={company?.profile?.abn}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.abn"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.acn" label="ACN">
                  <TextField
                    name="profile.acn"
                    disabled={loading}
                    placeholder="e.g. 64 781 737 080"
                    defaultValue={company?.profile?.acn}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.acn"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.crn" label="CRN">
                  <TextField
                    name="profile.crn"
                    disabled={loading}
                    placeholder="e.g. 64 781 737 080"
                    defaultValue={company?.profile?.crn}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.crn"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.email" label="Email">
                  <EmailField
                    name="profile.email"
                    disabled={loading}
                    placeholder="e.g. example@domain.com"
                    defaultValue={company?.profile?.email}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                    validation={{
                      pattern: {
                        value: /[^@]+@[^\.]+\..+/
                      }
                    }}
                  />
                  <FieldError
                    name="profile.email"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.manager" label="Manager">
                  <TextField
                    name="profile.manager"
                    disabled={loading}
                    placeholder="e.g. John Smith"
                    defaultValue={company?.profile?.owner}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.manager"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.mayor" label="Mayor">
                  <TextField
                    name="profile.mayor"
                    disabled={loading}
                    placeholder="e.g. John Smith"
                    defaultValue={company?.profile?.mayor}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.mayor"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.phone" label="Phone">
                  <TelField
                    name="profile.phone"
                    disabled={loading}
                    placeholder="e.g. +61400000000"
                    defaultValue={company?.profile?.phone}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.phone"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.mobile" label="Mobile">
                  <TelField
                    name="profile.mobile"
                    disabled={loading}
                    placeholder="e.g. +61400000000"
                    defaultValue={company?.profile?.mobile}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.mobile"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.fax" label="Fax">
                  <TelField
                    name="profile.fax"
                    disabled={loading}
                    placeholder="e.g. +61400000000"
                    defaultValue={company?.profile?.fax}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="profile.fax"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">
              Address
              <span className="ml-1 text-gray-400 font-light text-sm">
                (Optional)
              </span>
            </div>
            <table className="table table-zebra w-full">
              <tbody>
                <FormFieldTr name="address.name" label="Name">
                  <TextField
                    name="address.name"
                    disabled={loading}
                    placeholder="e.g. My house"
                    defaultValue={company?.profile?.address?.name}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.name"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="address.street" label="Street">
                  <TextField
                    name="address.street"
                    disabled={loading}
                    placeholder="e.g. 120/20 George St."
                    defaultValue={company?.profile?.address?.street}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.street"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="address.suburb" label="Suburb">
                  <TextField
                    name="address.suburb"
                    disabled={loading}
                    placeholder="e.g. Sydney"
                    defaultValue={company?.profile?.address?.suburb}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.suburb"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="address.state" label="State">
                  <TextField
                    name="address.state"
                    disabled={loading}
                    placeholder="e.g. NSW"
                    defaultValue={company?.profile?.address?.state}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.state"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="address.postalCode" label="Postal code">
                  <TextField
                    name="address.postalCode"
                    disabled={loading}
                    placeholder="e.g. 2200"
                    defaultValue={company?.profile?.address?.postalCode}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.postalCode"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="address.country" label="Country">
                  <TextField
                    name="address.country"
                    disabled={loading}
                    placeholder="e.g. Australia"
                    defaultValue={company?.profile?.address?.country}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="address.country"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-10 text-right">
        <button className="btn btn-primary mr-2">Save</button>
        <button className="btn btn-ghost">Cancel</button>
      </div>
    </Form>
  )
}

export default OrganizationCard

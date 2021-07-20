import { useApolloClient, useMutation } from '@apollo/client'
import {
  EmailField,
  FieldError,
  Form,
  FormError,
  Submit,
  TelField,
  TextField,
  UrlField
} from '@redwoodjs/forms'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CompanyLogoCell, { QUERY } from 'src/components/CompanyLogoCell'
import GoogleAddressForm from 'src/components/GoogleAddressForm'
import ImageUploaderOverlay, {
  FailedFile
} from 'src/components/ImageUploaderOverlay'
import PhoneNumberInput from 'src/components/PhoneNumberInput'
import { useMainLayoutContext } from 'src/layouts/MainLayout'
import type {
  GetCompany,
  GetCompanyVariables,
  UpdateCompany,
  UpdateCompanyProfile,
  UpdateCompanyProfileVariables,
  UpdateCompanyVariables
} from 'web/types/graphql'
import FormFieldTr from './FormFieldTr'

// TODO: Due to reusing the same AddressForm, data is attached to the same layer as profile
type OrganizationForm = UpdateCompany & {
  profile: UpdateCompanyProfile
  address: UpdateCompanyProfile['address']
}

interface Props {
  companyId: string
}

export const COMPANY_MUTATION = gql`
  mutation UpdateCompany($id: String!, $data: UpdateCompany!) {
    company: updateCompany(id: $id, data: $data) {
      id
      name
      logo
      displayName
      shortName
      website
      updatedAt
      createdAt
    }
  }
`

export const COMPANY_PROFILE_MUTATION = gql`
  mutation UpdateCompanyProfile(
    $companyId: String!
    $data: UpdateCompanyProfile!
  ) {
    companyProfile: updateCompanyProfile(companyId: $companyId, data: $data) {
      id
      companyId
      phone
      fax
      mobile
      fullName
      email
      abn
      acn
      crn
      owner
      mayor
      updatedAt
      address {
        lat
        lng
        gPlaceId
        premise
        state
        street
        suburb
        country
        postalCode
        updatedAt
        formattedAddress
      }
    }
  }
`

const OrganizationCard = ({ companyId }: Props) => {
  const { watchQuery } = useApolloClient()
  const { setAlert } = useMainLayoutContext()
  const [showUploader, setShowUploader] = useState(false)
  const { formState, reset, ...formMethods } = useForm<OrganizationForm>()
  const [
    updateCompany,
    { loading: companyUpdating, error: companyUpdateError }
  ] = useMutation<UpdateCompany, UpdateCompanyVariables>(COMPANY_MUTATION, {
    onCompleted: () => {
      reset()
    }
  })
  const [
    updateCompanyProfile,
    { loading: companyProfileUpdating, error: companyProfileUpdateError }
  ] = useMutation<UpdateCompanyProfile, UpdateCompanyProfileVariables>(
    COMPANY_PROFILE_MUTATION,
    {
      onCompleted: () => {
        reset()
      }
    }
  )
  const [company, setCompany] = useState<GetCompany['company']>()
  const error = companyUpdateError || companyProfileUpdateError
  const loading = companyUpdating || companyProfileUpdating
  // TODO: Due to reusing the same AddressForm, data is attached to the same layer as profile
  const handleSubmit = ({ address, profile, ...data }) => {
    const {
      profile: dirtyProfile,
      address: dirtyAddress,
      ...dirtyOthers
    } = formState.dirtyFields
    const updateOthers = Object.keys(dirtyOthers || {}).reduce((prev, key) => {
      prev[key] = data[key]
      return prev
    }, {})
    const updateAddress = Object.keys(dirtyAddress || {}).reduce(
      (prev, key) => {
        prev[key] = address[key]
        return prev
      },
      {}
    )
    const updateProfile = Object.keys(dirtyProfile || {}).reduce(
      (prev, key) => {
        prev[key] = profile[key]
        return prev
      },
      {}
    )

    if (Object.keys(updateOthers).length) {
      updateCompany({ variables: { id: companyId, data: updateOthers } })
    }

    if (
      Object.keys(updateAddress).length ||
      Object.keys(updateProfile).length
    ) {
      updateCompanyProfile({
        variables: {
          companyId,
          data: { ...updateProfile, address: updateAddress }
        }
      })
    }
  }

  const handleUploadSuccess = (urls) => {
    updateCompany({ variables: { id: companyId, data: { logo: urls[0] } } })
  }

  const handleUploadError = (error: FailedFile[]) => {
    setAlert({ level: 'error', message: error[0].message })
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
    <Form
      onSubmit={handleSubmit}
      validation={{ mode: 'onBlur' }}
      formMethods={{ reset, formState, ...formMethods }}
    >
      {error && <FormError error={error} />}
      <div
        className={`flex flex-col lg:flex-row lg:items-start mt-10 ${
          showUploader && 'opacity-95'
        }`}
      >
        <div className="card shadow-lg bg-base-100 flex-1 mb-10 lg:mr-10 lg:mb-0">
          <div className="card-body">
            <div className="card-title">Organization Information</div>
            <div className="h-28 w-28 text-4xl mx-auto mt-10 mb-6">
              <div
                data-tip="Click to upload logo"
                className="tooltip tooltip-primary w-full h-full"
              >
                <button
                  type="button"
                  disabled={loading}
                  className="w-full h-full"
                  onClick={() => {
                    setShowUploader(true)
                  }}
                >
                  <CompanyLogoCell id={companyId} />
                </button>
              </div>
            </div>
            <table className="table table-zebra w-full">
              <tbody>
                <FormFieldTr name="displayName" label="Display name">
                  <TextField
                    name="displayName"
                    disabled={loading}
                    placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                    defaultValue={company?.displayName}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="displayName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="name" label="Name">
                  <TextField
                    name="name"
                    disabled={loading}
                    placeholder="e.g. NSW ECUMENICAL COUNCIL INC"
                    defaultValue={company?.name}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
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
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="shortName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.fullName" label="Full name">
                  <TextField
                    name="profile.fullName"
                    disabled={loading}
                    placeholder="e.g. NEW SOUTH WALES ECUMENICAL COUNCIL INCORPORATED"
                    defaultValue={company?.profile?.fullName}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="profile.fullName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="website" label="Website">
                  <UrlField
                    name="website"
                    disabled={loading}
                    placeholder="e.g. https://www.example.com"
                    defaultValue={company?.website}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="website"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.abn" label="ABN">
                  <TextField
                    name="profile.abn"
                    disabled={loading}
                    placeholder="e.g. 64 781 737 080"
                    defaultValue={company?.profile?.abn}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
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
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
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
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
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
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
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
                <FormFieldTr name="profile.owner" label="Manager">
                  <TextField
                    name="profile.owner"
                    disabled={loading}
                    placeholder="e.g. John Smith"
                    defaultValue={company?.profile?.owner}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="profile.owner"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.mayor" label="Mayor">
                  <TextField
                    name="profile.mayor"
                    disabled={loading}
                    placeholder="e.g. John Smith"
                    defaultValue={company?.profile?.mayor}
                    className="input input-bordered w-full"
                    errorClassName="input input-error"
                  />
                  <FieldError
                    name="profile.mayor"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.phone" label="Phone">
                  <PhoneNumberInput
                    name="profile.phone"
                    disabled={loading}
                    inputComponent={TelField}
                    value={company?.profile?.phone}
                    className="input input-bordered w-full"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.mobile" label="Mobile">
                  <PhoneNumberInput
                    name="profile.mobile"
                    disabled={loading}
                    inputComponent={TelField}
                    value={company?.profile?.mobile}
                    className="input input-bordered w-full"
                  />
                </FormFieldTr>
                <FormFieldTr name="profile.fax" label="Fax">
                  <PhoneNumberInput
                    name="profile.fax"
                    disabled={loading}
                    inputComponent={TelField}
                    value={company?.profile?.fax}
                    className="input input-bordered w-full"
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
            <GoogleAddressForm
              loading={loading}
              address={company?.profile?.address}
            />
          </div>
        </div>
      </div>
      <div className={`my-10 text-right ${showUploader && 'opacity-95'}`}>
        <Submit
          disabled={loading || !formState.isDirty}
          className={`btn btn-primary mr-2 ${loading ? 'loading' : ''}`}
        >
          Save
        </Submit>
      </div>
      {showUploader && (
        <ImageUploaderOverlay
          onError={handleUploadError}
          onSuccess={handleUploadSuccess}
          onClose={() => setShowUploader(false)}
        />
      )}
    </Form>
  )
}

export default OrganizationCard

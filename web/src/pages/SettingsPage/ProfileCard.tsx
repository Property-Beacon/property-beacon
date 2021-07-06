import {
  FieldError,
  Form,
  FormError,
  Submit,
  TelField,
  TextField
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { RiInformationLine } from 'react-icons/ri'
import DateTimeString from 'src/components/DateTimeString'
import type {
  GetUserById,
  UpdateUserProfile,
  UserProfile
} from 'web/types/graphql'
import AddressForm from './AddressForm'
import FormFieldTr from './FormFieldTr'

interface Props {
  user: GetUserById['user']
}

export const MUTATION = gql`
  mutation UpdateUserProfile($userId: String!, $data: UpdateUserProfile!) {
    userProfile: updateUserProfile(userId: $userId, data: $data) {
      id
      avatar
      fullName
      firstName
      lastName
      mobile
      phone
      companyId
      updatedAt
      address {
        name
        state
        street
        suburb
        country
        postalCode
        updatedAt
      }
    }
  }
`

const ProfileCard = ({ user }: Props) => {
  const { formState, reset, ...formMethods } = useForm<UpdateUserProfile>()
  const [updateProfile, { loading, error }] = useMutation<UserProfile>(
    MUTATION,
    {
      onCompleted: () => {
        reset()
      }
    }
  )
  const handleSubmit = useCallback(
    ({ address, ...profile }: UpdateUserProfile) => {
      const data = formState.dirtyFields.address
        ? { address, ...profile }
        : { ...profile }
      updateProfile({ variables: { userId: user.id, data } })
    },
    [formState, user, updateProfile]
  )

  return (
    <Form
      formMethods={{ reset, formState, ...formMethods }}
      onSubmit={handleSubmit}
      validation={{ mode: 'onBlur' }}
    >
      {error && <FormError error={error} />}
      <div className="flex gap-10 flex-col lg:flex-row lg:items-start mt-10">
        <div className="card shadow-lg bg-base-100 flex-1">
          <div className="card-body">
            <div className="card-title">Personal Information</div>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th className="lg:w-48 hidden md:table-cell">Name</th>
                  <td className="text-sm rounded-lg md:rounded-none">
                    {user?.profile?.fullName ?? '-'}
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48 hidden md:table-cell">
                    Email
                    <div
                      data-tip="Contact us to change it"
                      className="tooltip tooltip-primary font-light"
                    >
                      <RiInformationLine
                        size={18}
                        className="text-primary align-text-bottom inline ml-0.5"
                      />
                    </div>
                  </th>
                  <td className="text-sm rounded-lg md:rounded-none">
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48 hidden md:table-cell">
                    Role
                    <div
                      data-tip="TODO"
                      className="tooltip tooltip-primary font-light"
                    >
                      <RiInformationLine
                        size={18}
                        className="text-primary align-text-bottom inline ml-0.5"
                      />
                    </div>
                  </th>
                  <td className="text-sm rounded-lg md:rounded-none">
                    {user.role}
                  </td>
                </tr>
                <tr>
                  <th className="lg:w-48 hidden md:table-cell">
                    Last logged in
                  </th>
                  <td className="text-sm rounded-lg md:rounded-none">
                    <DateTimeString date={user.logOn} />
                  </td>
                </tr>
                {user.logOff ? (
                  <tr>
                    <th className="lg:w-48 hidden md:table-cell">
                      Last logged off
                    </th>
                    <td className="text-sm rounded-lg md:rounded-none">
                      <DateTimeString date={user.logOff} />
                    </td>
                  </tr>
                ) : null}
                <FormFieldTr name="firstName" label="First name">
                  <TextField
                    name="firstName"
                    disabled={loading}
                    placeholder="e.g. David"
                    defaultValue={user?.profile?.firstName}
                    validation={{ pattern: /^[A-Za-z-]+$/i }}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="firstName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="lastName" label="Last name">
                  <TextField
                    name="lastName"
                    disabled={loading}
                    placeholder="e.g. Jones"
                    defaultValue={user?.profile?.lastName}
                    validation={{ pattern: /^[A-Za-z]+$/i }}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="lastName"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="phone" label="Phone">
                  <TelField
                    name="phone"
                    disabled={loading}
                    placeholder="e.g. +61400000000"
                    defaultValue={user?.profile?.phone}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="phone"
                    className="mt-1 label-text-alt text-error"
                  />
                </FormFieldTr>
                <FormFieldTr name="mobile" label="Mobile">
                  <TelField
                    name="mobile"
                    disabled={loading}
                    placeholder="e.g. +61400000000"
                    defaultValue={user?.profile?.mobile}
                    className="input input-sm input-bordered w-full"
                    errorClassName="input input-bordered input-error"
                  />
                  <FieldError
                    name="mobile"
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
                <AddressForm
                  loading={loading}
                  address={user?.profile?.address}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-10 text-right">
        <Submit
          disabled={loading || !formState.isDirty}
          className={`btn btn-primary mr-2 ${loading ? 'loading' : ''}`}
        >
          Save
        </Submit>
      </div>
    </Form>
  )
}

export default ProfileCard

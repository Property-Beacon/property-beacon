import { FieldError, Form, Submit, TelField, TextField } from '@redwoodjs/forms'
import { RiInformationLine } from 'react-icons/ri'
import DateTimeString from 'src/components/DateTimeString'
import type { GetUserById } from 'web/types/graphql'
import FormFieldTr from './FormFieldTr'

interface Props {
  user: GetUserById['user']
}

const ProfileCard = ({ user }: Props) => {
  const loading = false
  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit}>
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
                <FormFieldTr name="address.name" label="Name">
                  <TextField
                    name="address.name"
                    disabled={loading}
                    placeholder="e.g. My house"
                    defaultValue={user?.profile?.address?.name}
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
                    defaultValue={user?.profile?.address?.street}
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
                    defaultValue={user?.profile?.address?.suburb}
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
                    defaultValue={user?.profile?.address?.state}
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
                    defaultValue={user?.profile?.address?.postalCode}
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
                    defaultValue={user?.profile?.address?.country}
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
        <Submit className="btn btn-primary mr-2">Save</Submit>
        <button className="btn btn-ghost">Cancel</button>
      </div>
    </Form>
  )
}

export default ProfileCard

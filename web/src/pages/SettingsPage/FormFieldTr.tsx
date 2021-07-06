import { Label } from '@redwoodjs/forms'
import { FC } from 'react'

interface Props {
  name: string
  label: string
}

const FormFieldTr: FC<Props> = ({ name, label, children }) => (
  <tr>
    <th className="lg:w-48 hidden md:table-cell capitalize">{label}</th>
    <td className="rounded-lg md:rounded-none">
      <div className="form-control">
        <Label
          name={name}
          className="mb-2 capitalize font-semibold text-sm md:hidden"
        >
          {label}
        </Label>
        {children}
      </div>
    </td>
  </tr>
)

export default FormFieldTr

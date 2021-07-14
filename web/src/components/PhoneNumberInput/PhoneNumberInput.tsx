// ECMA official polyfill for Intl.Locale
import { Locale } from '@formatjs/intl-locale'
import PhoneInput, { PhoneInputProps } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface Props extends Omit<PhoneInputProps, 'onChange'> {
  onChange?: (value: string) => void
}

const PhoneNumberInput = ({ onChange, ...props }: Props) => {
  const defaultCountry =
    'language' in navigator ? new Locale(navigator.language).region : undefined
  const handleChange = (value: string) => {
    onChange?.(value)
  }

  return (
    <div className="form-control">
      <PhoneInput
        international
        onChange={handleChange}
        defaultCountry={defaultCountry}
        data-testid="phone-number-input"
        {...props}
      />
    </div>
  )
}

export default PhoneNumberInput

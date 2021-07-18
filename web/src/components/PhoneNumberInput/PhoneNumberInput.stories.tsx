import PhoneNumberInput from './PhoneNumberInput'

export const defaultInline = () => {
  return (
    <div className="w-80">
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="default"
        onChange={(value) => {
          console.info(value)
        }}
      />
    </div>
  )
}
export const variants = () => {
  return (
    <div className="w-80 flex flex-col">
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-ghost"
        className="input input-ghost mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="iinput nput-bordered"
        className="input input-bordered mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-primary"
        className="input input-primary mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-secondary"
        className="input input-secondary mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-accent"
        className="input input-accent mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-info"
        className="input input-info mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-success"
        className="input input-success mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-warning"
        className="input input-warning mb-4"
        onChange={(value) => {
          console.info(value)
        }}
      />
      <PhoneNumberInput
        value=""
        international={false}
        placeholder="input input-error"
        className="input input-error"
        onChange={(value) => {
          console.info(value)
        }}
      />
    </div>
  )
}

export const defaultBrowserCountry = () => {
  return (
    <div className="w-80">
      <PhoneNumberInput
        value=""
        className="input input-primary"
        onChange={(value) => {
          console.info(value)
        }}
      />
    </div>
  )
}

export const defaultCountry = () => {
  return (
    <div className="w-80">
      <PhoneNumberInput
        value=""
        className="input input-primary"
        defaultCountry="JP"
        onChange={(value) => {
          console.info(value)
        }}
      />
    </div>
  )
}

export const national = () => {
  return (
    <div className="w-80">
      <PhoneNumberInput
        value=""
        className="input input-primary"
        international={false}
        onChange={(value) => {
          console.info(value)
        }}
      />
    </div>
  )
}

export default { title: 'Components/PhoneNumberInput' }

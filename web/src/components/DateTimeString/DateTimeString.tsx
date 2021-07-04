interface Props {
  date: Date | string
  options?: Intl.DateTimeFormatOptions
}

const DateTimeString = ({ date, options }: Props) => {
  const formatter = new Intl.DateTimeFormat(
    navigator.language,
    options || {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    }
  )

  return <>{formatter.format(new Date(date))}</>
}

export default DateTimeString

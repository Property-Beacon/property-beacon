interface Props {
  date: Date | string
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

const DateTimeString = ({ date, locale, options }: Props) => {
  const formatter = new Intl.DateTimeFormat(
    locale || navigator.language,
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

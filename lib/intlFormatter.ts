const dateFormatterMap = new Map<string, Intl.DateTimeFormat>();

const longDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const getDateFormatter = (locale: string, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  const formatter = dateFormatterMap.get(locale);

  if (formatter) {
    return formatter;
  }

  const newFormatter = new Intl.DateTimeFormat(locale, { ...longDateOptions, ...options });
  dateFormatterMap.set(locale, newFormatter);
  return newFormatter;
};

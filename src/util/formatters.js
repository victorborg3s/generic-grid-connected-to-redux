const defaultLang = 'pt-BR';
export const number = new Intl.NumberFormat(defaultLang);
export const numberWith2FractionDigits = new Intl.NumberFormat(defaultLang, {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
});
export const currency = new Intl.NumberFormat(defaultLang, { style: 'currency', currency: 'BRL' });
const dateFormatter = new Intl.DateTimeFormat(defaultLang);
const dateAndTimeFormatter = new Intl.DateTimeFormat(defaultLang, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
export const date = {
  format: (sDate) => dateFormatter.format(new Date(`${sDate} GMT-3`)),
};
export const dateAndTime = {
  format: (sDateAndTime) => dateAndTimeFormatter.format(new Date(`${sDateAndTime} GMT-3`)),
};
export const string = {
  format: (s) => s,
};
export const input = {
  format: (i) => i,
};

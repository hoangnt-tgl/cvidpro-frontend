export const listOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

export const selectStyle = {
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: 'black',
    fontWeight: '550',
  }),
  optionsSelect: (baseStyles, state) => ({
    ...baseStyles,
    color: 'black',
    fontWeight: '550',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: 'black',
    fontWeight: '550',
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: '#777777',
    fontWeight: '550',
  }),
  noOptionsMessage: (baseStyles, state) => ({
    ...baseStyles,
    color: 'black',
    fontWeight: '550',
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: 'black',
    fontWeight: '550',
  }),
};

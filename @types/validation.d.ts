import { StringLocale, NumberLocale, TestOptionsMessage } from 'yup';

interface ValidationString {
  type: 'string'
  min?: [number, StringLocale['min']]
  max?: [number, StringLocale['max']]
  required?: [TestOptionsMessage]
  matches?: [RegExp, StringLocale['matches']]
}

interface ValidationNumber {
  type: 'number'
  min?: [number, NumberLocale['min']]
  max?: [number, NumberLocale['max']]
  required?: [TestOptionsMessage]
}

export type Validation = ValidationString | ValidationNumber
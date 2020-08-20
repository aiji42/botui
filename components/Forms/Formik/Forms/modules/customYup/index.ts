import * as yup from 'yup';

interface ValidationTypeString {
  type: 'string'
  min?: [number, yup.StringLocale['min']]
  max?: [number, yup.StringLocale['max']]
  required?: [yup.TestOptionsMessage]
  matches?: [RegExp, yup.StringLocale['matches']]
}
const isValidationTypeString = (arg: any): arg is ValidationTypeString => arg?.type === 'string'

const customYupString = (name: string, validation: ValidationTypeString) => {
  const { min, max, required, matches } = validation
  let yupper = yup.string()
  if (min) yupper = yupper.min(...min)
  if (max) yupper = yupper.max(...max)
  if (required) yupper = yupper.required(...required)
  if (matches) yupper = yupper.matches(...matches)
  return {
    [name]: yupper
  }
}

interface ValidationTypeNumber {
  type: 'number'
  min?: [number, yup.NumberLocale['min']]
  max?: [number, yup.NumberLocale['max']]
  required?: [yup.TestOptionsMessage]
}
const isValidationTypeNumber = (arg: any): arg is ValidationTypeNumber => arg?.type === 'number'

const customYupNumber = (name: string, validation: ValidationTypeNumber) => {
  const { min, max, required } = validation
  let yupper = yup.number()
  if (min) yupper = yupper.min(...min)
  if (max) yupper = yupper.max(...max)
  if (required) yupper = yupper.required(...required)
  return {
    [name]: yupper
  }
}

export interface CustomYupProps {
  name: string
  validation?: ValidationTypeString | ValidationTypeNumber
}

export const customYup = ({ name, validation }: CustomYupProps) => {
  if (isValidationTypeString(validation)) return customYupString(name, validation)
  if (isValidationTypeNumber(validation)) return customYupNumber(name, validation)
  return customYupString(name, { type: 'string' })
}

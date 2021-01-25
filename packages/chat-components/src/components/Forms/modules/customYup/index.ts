import * as yup from 'yup'

interface ValidationTypeString {
  type: 'string'
  min?: [number, string]
  max?: [number, string]
  required?: [string]
  matches?: [RegExp, string]
}

interface CustomYupString {
  [x: string]: yup.StringSchema
}

const customYupString = (
  name: string,
  validation: ValidationTypeString
): CustomYupString => {
  const { min, max, required, matches } = validation
  let myYup = yup.string()
  if (min) myYup = myYup.min(...min)
  if (max) myYup = myYup.max(...max)
  if (required) myYup = myYup.required(...required)
  if (matches) myYup = myYup.matches(...matches)
  return {
    [name]: myYup
  }
}

interface ValidationTypeNumber {
  type: 'number'
  min?: [number, string]
  max?: [number, string]
  required?: [string]
}

interface CustomYupNumber {
  [x: string]: yup.NumberSchema
}

const customYupNumber = (
  name: string,
  validation: ValidationTypeNumber
): CustomYupNumber => {
  const { min, max, required } = validation
  let myYup = yup.number()
  if (min) myYup = myYup.min(...min)
  if (max) myYup = myYup.max(...max)
  if (required) myYup = myYup.required(...required)
  return {
    [name]: myYup
  }
}

const isValidationTypeNumber = (
  arg?: ValidationTypeString | ValidationTypeNumber
): arg is ValidationTypeNumber => arg?.type === 'number'

const isValidationTypeString = (
  arg?: ValidationTypeString | ValidationTypeNumber
): arg is ValidationTypeString => arg?.type === 'string'

export interface CustomYupProps {
  name: string
  validation?: ValidationTypeString | ValidationTypeNumber
}

export const customYup = ({
  name,
  validation
}: CustomYupProps): CustomYupString | CustomYupNumber => {
  if (isValidationTypeString(validation))
    return customYupString(name, validation)
  if (isValidationTypeNumber(validation))
    return customYupNumber(name, validation)
  return customYupString(name, { type: 'string' })
}

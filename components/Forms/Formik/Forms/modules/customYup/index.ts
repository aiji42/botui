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
  let yupper = yup.number()
  if (min) yupper = yupper.min(...min)
  if (max) yupper = yupper.max(...max)
  if (required) yupper = yupper.required(...required)
  return {
    [name]: yupper
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

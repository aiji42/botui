import {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  TextareaHTMLAttributes,
  InputHTMLAttributes
} from 'react'

interface FormBase<
  Type extends string,
  Values extends Record,
  Status extends Record
> {
  type: Type
  values: Values
  status: Status
  onSubmitted: (params: any) => void
}

export interface FormAddressValues {
  postalCode: string | number
  prefecture: string
  prefectureId: number | string
  city: string
  street: string | number
  building: string
}

export type FormAddress = FormBase<
  'FormAddress',
  Partial<FormAddressValues>,
  Record<string, never>
>

export interface FormBirthDayValues {
  birthdayYear: string | number
  birthdayMonth: string | number
  birthdayDay: string | number
}

export type FormBirthDay = FormBase<
  'FormBirthDay',
  Partial<FormBirthDayValues>,
  {
    paddingZero?: boolean
  }
>

export interface FormEmailValues {
  email: string
}

export type FormEmail = FormBase<
  'FormEmail',
  Partial<FormEmailValues>,
  Record<string, never>
>

export interface FormNameValues {
  familyName: string
  familyNameKana: string
  firstName: string
  firstNameKana: string
}

export type FormName = FormBase<
  'FormName',
  Partial<FormNameValues>,
  {
    kana?: boolean
    kanaType?: 'hiragana' | 'katakana'
  }
>

export interface FormTelValues {
  tel: string | number
}

export type FormTel = FormBase<
  'FormTel',
  Partial<FormTelValues>,
  Record<string, never>
>

export interface FormCreditCardValues {
  creditCardNumber: string | number
  creditCardExpiryYear: string | number
  creditCardExpiryMonth: string | number
  creditCardName: string | number
  creditCardCvc: string | number
}

export type FormCreditCard = FormBase<
  'FormCreditCard',
  Partial<FormCreditCardValues>,
  Record<string, never>
>

interface CustomRadio extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

export interface FormCustomRadioGroupValues {
  [x: string]: number | string | boolean
}

export interface FormCustomRadioGroup
  extends FormBase<
    'FormCustomRadioGroup',
    FormCustomRadioGroupValues,
    Record<string, never>
  > {
  name: string
  inputs: Array<CustomRadio>
}

interface CustomCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

export interface FormCustomCheckboxValues {
  [x: string]: number | string | boolean
}

export interface FormCustomCheckbox
  extends FormBase<
    'FormCustomCheckbox',
    FormCustomCheckboxValues,
    Record<string, never>
  > {
  name: string
  inputs: Array<CustomCheckbox>
  required?: boolean
}

interface CustomSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  title?: string
  options: OptionHTMLAttributes<HTMLOptionElement>[]
}

export interface FormCustomSelectValues {
  [x: string]: number | string
}

export interface FormCustomSelect
  extends FormBase<
    'FormCustomSelect',
    FormCustomSelectValues,
    Record<string, never>
  > {
  selects: Array<CustomSelect>
}

interface CustomInput extends InputHTMLAttributes<HTMLIFrameElement> {
  name: string
  type?: 'text' | 'number' | 'tel' | 'password' | 'email'
  title?: string
  validation?: string
}

export interface FormCustomInputValues {
  [x: string]: number | string
}

export interface FormCustomInput
  extends FormBase<
    'FormCustomInput',
    FormCustomInputValues,
    Record<string, never>
  > {
  inputs: Array<CustomInput>
}

export interface FormCustomTextareaValues {
  [x: string]: string
}

export interface FormCustomTextarea
  extends FormBase<
      'FormCustomTextarea',
      FormCustomTextareaValues,
      Record<string, never>
    >,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  title?: string
  validation?: string
}

export interface FormConfirmValues {
  confirmed: boolean
  confirmHTML: string
}

export type FormConfirm = FormBase<
  'FormConfirm',
  Partial<FormConfirmValues>,
  Record<string, never>
>

export type Form =
  | FormAddress
  | FormBirthDay
  | FormConfirm
  | FormCreditCard
  | FormCustomInput
  | FormCustomSelect
  | FormCustomCheckbox
  | FormCustomRadioGroup
  | FormCustomTextarea
  | FormEmail
  | FormName
  | FormTel

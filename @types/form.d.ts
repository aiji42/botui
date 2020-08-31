import { SelectHTMLAttributes, OptionHTMLAttributes } from "react";
import { Validation } from "./validation";

interface FormBase<Type extends string, Values extends {}>{
  type: Type
  values: Values
  onSubmited: (parm: any) => void
}

export interface FormAddressValues {
  postalCode: string | number
  pref: string | number
  city: string
  street: string | number
}

export interface FormAddress extends FormBase<'FormAddress', {
  postalCode?: string | number
  pref?: string | number
  city?: string
  street?: string | number
}> { }

export interface FormBirthDayValues {
  birthdayYear: string | number
  birthdayMonth: string | number
  birthdayDay: string | number
}

export interface FormBirthDay extends FormBase<'FormBirthDay', {
  birthdayYear?: string | number
  birthdayMonth?: string | number
  birthdayDay?: string | number
}> { }

export interface FormEmailValues {
  email: string
}

export interface FormEmail extends FormBase<'FormEmail', {
  email?: string
}> { }

export interface FormNameValues {
  familyName: string
  familyNameKana: string
  firstName: string
  firstNameKana: string
}

export interface FormName extends FormBase<'FormName', {
  familyName?: string
  familyNameKana?: string
  firstName?: string
  firstNameKana?: string
}> { }

export interface FormTelValues {
  tel: string | number
}

export interface FormTel extends FormBase<'FormTel', {
  tel?: string | number
}> { }

export interface FormCreditCardValues {
  creditCardNumber: string | number
  creditCardExpiryYear: string | number
  creditCardExpiryMonth: string | number
  creditCardName: string | number
  creditCardCvc: string | number
}

export interface FormCreditCard extends FormBase<'FormCreditCard', {
  creditCardNumber?: string | number
  creditCardExpiryYear?: string | number
  creditCardExpiryMonth?: string | number
  creditCardName?: string | number
  creditCardCvc?: string | number
}> { }

interface CustomRadio extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  title: string
}

export interface FormCustomRadioGroup extends FormBase<'FormCustomRadioGroup', {
  [x: string]: number | string | boolean
}> {
  inputs: Array<CustomRadio>
  validation?: Validation
}

interface CustomSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  title?: string
  options: OptionHTMLAttributes<HTMLOptionElement>[]
  validation?: Validation
}

export interface FormCustomSelect extends FormBase<'FormCustomSelect', {
  [x: string]: number | string
}> {
  selects: Array<CustomSelect>
}

interface CustomInput extends InputHTMLAttributes<HTMLIFrameElement> {
  name: string
  type?: 'text' | 'number' | 'tel'
  title?: string
  validation?: Validation
}

export interface FormCustomInput extends FormBase<'FormCustomInput', {
  [x: string]: number | string
}> {
  inputs: Array<CustomInput>
}

export interface FormCustomTextarea extends FormBase<'FormCustomTextarea', {
  [x: string]: string
}> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  title?: string
  validation?: Validation
}

export interface FormConfirmValues {
  confirmed: boolean
  confirmHTML: string
}

export interface FormConfirm extends FormBase<'FormConfirm', {
  confirmHTML: string
}> {}

export type Form = FormAddress | FormBirthDay | FormConfirm | FormCreditCard | FormCustomInput | FormCustomSelect
  | FormCustomRadioGroup | FormCustomTextarea | FormEmail | FormName | FormTel
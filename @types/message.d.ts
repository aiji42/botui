import { HTMLAttributes } from 'react'
import { Form as FormType } from './form'

export interface ContentForm {
  type: 'form'
  props: FormType
}

export interface StringType extends HTMLAttributes<HTMLSpanElement> { }

export interface ContentString {
  type: 'string'
  props: StringType
}

export type Content = {
  delay?: number
} & (ContentForm | ContentString)

export interface Message {
  human: boolean
  iconDisplay?: boolean
  content: Content
  completed: boolean
  updated?: boolean
}
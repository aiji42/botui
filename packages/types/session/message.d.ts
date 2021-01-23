import { Form as FormType } from './form'
import { HTMLAttributes } from 'react'

export interface ContentString {
  type: 'string'
  props: HTMLAttributes<HTMLSpanElement>
  delay?: number
}

export interface ContentImage {
  type: 'image'
  props: { imgKey: string }
  delay?: number
}

export interface ContentForm {
  type: 'form'
  props: FormType
  delay?: number
}

export type Content = ContentForm | ContentImage | ContentString

export interface Message<T = Content> {
  id: string | number
  human: boolean
  iconDisplay?: boolean
  content: T
  completed: boolean
  updated: boolean
}

export type Messages<T = Content> = Array<Message<T>>

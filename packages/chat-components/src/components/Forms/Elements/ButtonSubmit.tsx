import React, { FC, ButtonHTMLAttributes } from 'react'
import Button from './Button'
import { useFormikContext } from 'formik'
import { useMessageContext } from '@botui/chat-hooks'

const ButtonSubmit: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const {
    message: { completed }
  } = useMessageContext()
  const { isValid, isSubmitting, dirty } = useFormikContext()
  const disabled = (!dirty && completed) || !isValid || isSubmitting
  const updated = dirty && completed

  return (
    <Button type="submit" {...props} disabled={disabled}>
      {children || updated ? '変更' : '次へ'}
    </Button>
  )
}

export default ButtonSubmit

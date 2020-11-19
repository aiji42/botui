import { FC, useCallback } from 'react'
import * as Forms from '../../../Forms'
import { ContentForm, Form as FormType } from '@botui/types'
import { useMessageContext } from '../../../../hooks/use-message-context'

const Form: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as FormType
  const handleComplete = useCallback(
    (props: FormType) => {
      const newContent = { ...message.content, props } as ContentForm
      if (!handleUpdate) return
      if (message.completed)
        handleUpdate({ ...message, content: newContent, updated: true })
      else handleUpdate({ ...message, content: newContent, completed: true })
    },
    [message, handleUpdate]
  )

  if (props.type === 'FormAddress')
    return <Forms.FormAddress {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormBirthDay')
    return <Forms.FormBirthDay {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormEmail')
    return <Forms.FormEmail {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormName')
    return <Forms.FormName {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormTel')
    return <Forms.FormTel {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormCreditCard')
    return <Forms.FormCreditCard {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormCustomRadioGroup')
    return (
      <Forms.FormCustomRadioGroup {...props} onSubmitted={handleComplete} />
    )
  if (props.type === 'FormCustomSelect')
    return <Forms.FormCustomSelect {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormCustomInput')
    return <Forms.FormCustomInput {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormCustomTextarea')
    return <Forms.FormCustomTextarea {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormCustomCheckbox')
    return <Forms.FormCustomCheckbox {...props} onSubmitted={handleComplete} />
  if (props.type === 'FormConfirm')
    return <Forms.FormConfirm {...props} onSubmitted={handleComplete} />
  return <></>
}

export default Form

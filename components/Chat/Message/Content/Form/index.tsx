import { FC, useCallback } from 'react'
import * as Forms from '../../../../Forms'
import { Form as FormType } from '@botui/types'
import { useMessageContext } from '../../../../../hooks/use-message-context'

const Form: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as FormType
  const handleComplete = useCallback(
    (props: FormType) => {
      const newContent = { ...message.content, props }
      if (!handleUpdate) return
      if (message.completed)
        handleUpdate({ ...message, content: newContent, updated: true })
      else handleUpdate({ ...message, content: newContent, completed: true })
    },
    [props]
  )

  if (props.type === 'FormAddress')
    return <Forms.FormAddress {...props} onSubmited={handleComplete} />
  if (props.type === 'FormBirthDay')
    return <Forms.FormBirthDay {...props} onSubmited={handleComplete} />
  if (props.type === 'FormEmail')
    return <Forms.FormEmail {...props} onSubmited={handleComplete} />
  if (props.type === 'FormName')
    return <Forms.FormName {...props} onSubmited={handleComplete} />
  if (props.type === 'FormTel')
    return <Forms.FormTel {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCreditCard')
    return <Forms.FormCreditCard {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomRadioGroup')
    return <Forms.FormCustomRadioGroup {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomSelect')
    return <Forms.FormCustomSelect {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomInput')
    return <Forms.FormCustomInput {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomTextarea')
    return <Forms.FormCustomTextarea {...props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomCheckbox')
    return <Forms.FormCustomCheckbox {...props} onSubmited={handleComplete} />
  if (props.type === 'FormConfirm')
    return <Forms.FormConfirm {...props} onSubmited={handleComplete} />
  return <></>
}

export default Form

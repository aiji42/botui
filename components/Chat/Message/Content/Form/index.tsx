import { FC, useCallback } from 'react'
import * as Forms from '../../../../Forms'
import { Form as FormType } from '../../../../../@types/form'
import { useMessageContext } from '../../../../../hooks/use-message-context'

const Form: FC = () => {
  const { message, handleUpdate } = useMessageContext()
  const props = message.content.props as FormType
  const handleComplete = useCallback((p: FormType) => {
    const newContent = { ...message.content, props: { ...props, props: p } }
    if (message.completed) handleUpdate({ ...message, content: newContent, updated: true })
    else handleUpdate({ ...message, content: newContent, completed: true })
  }, [props])

  if (props.type === 'FormAddress') return <Forms.FormAddress {...props.values} onSubmited={handleComplete} />
  if (props.type === 'FormBirthDay') return <Forms.FormBirthDay {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormEmail') return <Forms.FormEmail {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormName') return <Forms.FormName {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormTel') return <Forms.FormTel {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormCreditCard') return <Forms.FormCreditCard {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomRadioGroup') return <Forms.FormCustomRadioGroup {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomSelect') return <Forms.FormCustomSelect {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomInput') return <Forms.FormCustomInput {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormCustomTextarea') return <Forms.FormCustomTextarea {...props.props} onSubmited={handleComplete} />
  if (props.type === 'FormConfirm') return <Forms.FormConfirm {...props.props} onSubmited={handleComplete} />
  return <></>
}

export default Form
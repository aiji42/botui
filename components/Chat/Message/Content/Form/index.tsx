import { FC, useContext, useCallback } from 'react'
import * as Forms from '../../../../Forms'
import { MessageContext } from '../../..'

type TypeKeys = 'FormAddress' | 'FormBirthDay' | 'FormEmail' | 'FormName' | 'FormTel' | 'FormCreditCard'
  | 'FormCustomRadioGroup' | 'FormCustomSelect' | 'FormCustomInput' | 'FormCustomTextarea' | 'FormConfirm'

export interface FormType {
  type: TypeKeys
  props: any
}


const Form: FC = () => {
  const { message, handleUpdate } = useContext(MessageContext)
  const props = message.content.props as FormType
  const handleComplete = useCallback(() => { handleUpdate({ ...message, completed: true }) }, [handleUpdate])

  if (props.type === 'FormAddress') return <Forms.FormAddress {...props.props} onSubmited={handleComplete} />
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
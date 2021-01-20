/** @jsxImportSource @emotion/react */
import { FC, useCallback } from 'react'
import * as Forms from '@botui/chat-components'
import { useMessageContext } from '@botui/chat-hooks'
import { ContentForm, Form as FormType } from '@botui/types'
import { css } from '@emotion/react'

const style = {
  form: css({
    minWidth: 250
  })
}

const Form: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentForm>()
  const props = message.content.props
  const handleComplete = useCallback(
    (props: FormType) => {
      const newContent = { ...message.content, props }
      if (!handleUpdate) return
      if (message.completed)
        handleUpdate({ ...message, content: newContent, updated: true })
      else handleUpdate({ ...message, content: newContent, completed: true })
    },
    [message, handleUpdate]
  )

  return (
    <div css={style.form}>
      {props.type === 'FormAddress' && (
        <Forms.FormAddress {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormBirthDay' && (
        <Forms.FormBirthDay {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormEmail' && (
        <Forms.FormEmail {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormName' && (
        <Forms.FormName {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormTel' && (
        <Forms.FormTel {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCreditCard' && (
        <Forms.FormCreditCard {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomRadioGroup' && (
        <Forms.FormCustomRadioGroup {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomSelect' && (
        <Forms.FormCustomSelect {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomInput' && (
        <Forms.FormCustomInput {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomTextarea' && (
        <Forms.FormCustomTextarea {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomCheckbox' && (
        <Forms.FormCustomCheckbox {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormConfirm' && (
        <Forms.FormConfirm {...props} onSubmitted={handleComplete} />
      )}
    </div>
  )
}

export default Form

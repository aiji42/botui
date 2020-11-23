import { FC, useEffect } from 'react'
import {
  Form,
  useForm,
  useFormState,
  FormRenderProps,
  FormProps
} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import ProposalFormInner from './ProposalFormInner'

interface FormFunctions {
  trySubmit: boolean
  handleTrySubmit: (flag: boolean) => void
  handleSubmittable: (flag: boolean) => void
}

const ProposalForm: FC<FormProps<any, Partial<any>> & FormFunctions> = (
  props
) => {
  const { trySubmit, handleTrySubmit, handleSubmittable, ...rest } = props
  return (
    <Form
      mutators={{ ...arrayMutators }}
      subscription={{
        submitting: true,
        pristine: true,
        valid: true,
        invalid: true
      }}
      destroyOnUnregister
      {...rest}
      render={(formProps) => (
        <FormWrapper
          {...formProps}
          trySubmit={trySubmit}
          handleTrySubmit={handleTrySubmit}
          handleSubmittable={handleSubmittable}
        />
      )}
    />
  )
}

export default ProposalForm

const FormWrapper: FC<FormRenderProps<any, Partial<any>> & FormFunctions> = (
  props
) => {
  const { submit } = useForm()
  const { pristine } = useFormState()
  useEffect(() => {
    if (!props.trySubmit) return
    submit()
    props.handleTrySubmit(false)
  }, [props.trySubmit])
  useEffect(() => {
    props.handleSubmittable(!pristine)
  }, [pristine, props.handleSubmittable])
  return <ProposalFormInner />
}

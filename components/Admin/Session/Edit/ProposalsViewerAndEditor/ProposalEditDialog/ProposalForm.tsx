import { FC, useEffect } from 'react'
import {
  Form,
  useForm,
  useFormState,
  FormRenderProps,
  FormProps
} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import ProposalMessageFormInner from './ProposalMessageFormInner'
import ProposalSkipperFormInner from './ProposalSkipperFormInner'
import { Proposal } from '../../../../../../@types/session'

interface FormFunctions {
  trySubmit: boolean
  handleTrySubmit: (flag: boolean) => void
  handleSubmittable: (flag: boolean) => void
}

const ProposalForm: FC<
  FormProps<Proposal, Partial<Proposal>> & FormFunctions
> = (props) => {
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

const FormWrapper: FC<
  FormRenderProps<Proposal, Partial<Proposal>> & FormFunctions
> = (props) => {
  const { submit } = useForm()
  const { pristine, values } = useFormState<Proposal>()
  useEffect(() => {
    if (!props.trySubmit) return
    submit()
    props.handleTrySubmit(false)
  }, [props.trySubmit])
  useEffect(() => {
    props.handleSubmittable(!pristine)
  }, [pristine, props.handleSubmittable])
  return values.type === 'message' ? (
    <ProposalMessageFormInner />
  ) : (
    <ProposalSkipperFormInner />
  )
}

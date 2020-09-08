import { FormikBag } from 'formik'

interface Values {
  [key: string]: any
}

export interface HandleSubmitProps {
  onSubmited: (parm: any) => void
}

export const customHandleSubmit = <T = Values>(
  values: T,
  formikBag: FormikBag<HandleSubmitProps, T>
): void => {
  const { props, setSubmitting } = formikBag
  props.onSubmited({ ...props, values })
  setSubmitting(false)
}

import { FormikBag } from 'formik'

type Values = Record<string, unknown>

export interface HandleSubmitProps {
  onSubmitted: (parm: unknown) => void
}

export const customHandleSubmit = <T = Values>(
  values: T,
  formikBag: FormikBag<HandleSubmitProps, T>
): void => {
  const { props, resetForm } = formikBag
  props.onSubmitted({ ...props, values })
  const touched = Object.keys(values).reduce(
    (res, key) => ({ ...res, [key]: true }),
    {}
  )
  resetForm({ values, touched })
}

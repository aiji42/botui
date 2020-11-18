import { FormikBag } from 'formik'

interface Values {
  [key: string]: any
}

export interface HandleSubmitProps {
  onSubmitted: (parm: any) => void
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

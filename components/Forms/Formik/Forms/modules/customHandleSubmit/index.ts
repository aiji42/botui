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
  const { props, resetForm } = formikBag
  props.onSubmited({ ...props, values })
  const touched = Object.keys(values).reduce(
    (res, key) => ({ ...res, [key]: true }),
    {}
  )
  resetForm({ values, touched })
}

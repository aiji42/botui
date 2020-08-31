import { FormikBag } from 'formik'

interface Values {
  [key: string]: any
}

export interface HandleSubmitProps {
  onSubmited: (parm: any) => void
}

export const customHandleSubmit = <T = Values>(values: T, formikBag: FormikBag<HandleSubmitProps, T>) => {
  const { props, setSubmitting } = formikBag
  // if(Object.values(values).every(value => value != null)) onUpdate()
  // Object.entries(values).forEach(([key, value]) => !secure && saveStoreValue(key, value))
  // Object.entries(values).forEach(([key, value]) => dataStore[key] = value)
  props.onSubmited({ ...props, values });
  setSubmitting(false);
}
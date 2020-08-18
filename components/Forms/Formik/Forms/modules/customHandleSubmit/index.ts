import { FormikHelpers, FormikBag } from 'formik'

type DataStoreType = {
  [key: string]: string
}
const dataStore: DataStoreType = {}
const saveStoreValue = (key: string, value: any) => {} // TODO: this is dummy for save localstrage

type Values = {
  [key: string]: any
}

export type HandleSubmitProps = {
  onSubmited: () => void
  onUpdate: () => void
  secure?: boolean
}

export const customHandleSubmit = <T = Values>(values: T, formikBag: FormikBag<HandleSubmitProps, T>) => {
  const { props: { onSubmited, onUpdate, secure }, setSubmitting } = formikBag
  if(Object.values(values).every(value => value != null)) onUpdate()
  Object.entries(values).forEach(([key, value]) => !secure && saveStoreValue(key, value))
  Object.entries(values).forEach(([key, value]) => dataStore[key] = value)
  onSubmited();
  setSubmitting(false);
}
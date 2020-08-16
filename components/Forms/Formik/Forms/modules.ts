import { FormikHelpers } from 'formik';
import { dataStore, saveStoreValue } from '../../../../dataStore';

type Values = {
  [key: string]: string | number | boolean
}

type FormikBag<V> = {
  props: {
    onSubmited: () => void
    onUpdate: () => void
  }
} & FormikHelpers<V>

type HandleSubmit = (values: Values, formikBag: FormikBag<Values>) => void

export const handleSubmit: HandleSubmit = (values, { props, setSubmitting }) => {
  if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
  Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
  Object.keys(values).forEach(key => dataStore[key] = values[key]);
  props.onSubmited();
  setSubmitting(false);
}
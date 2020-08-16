import { FC } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputWithIcon from '../Elements/InputWithIcon'
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

type Values = {
  email: string
  [key: string]: string
}

const Form: FC<FormikProps<Values>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputWithIcon} type="email" placeholder="yamada@example.com" name="email" title="メールアドレス" autoFocus />
      <ErrorMessage name="email" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

type FormikBag = {
  props: {
    onSubmited: () => void
    onUpdate: () => void
  }
} & FormikHelpers<Values>

const FormEmail = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: yup.object().shape({
    email: yup.string()
      .required('入力して下さい')
      .matches(/^([a-z0-9+_.-]+)@([a-z0-9-]+\.)+[a-z]{2,6}$/, '正しい形式で入力してください')
  }),
  validateOnMount: true,
  handleSubmit: (values: Values, { props, setSubmitting }: FormikBag) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(Form);

export default FormEmail;


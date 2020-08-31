import { FC } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import InputWithIcon from '../Elements/InputWithIcon'
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { customHandleSubmit } from './modules'
import { FormEmailValues, FormEmail as FormEmailType } from '../../../../@types/form';

const Form: FC<FormikProps<FormEmailValues>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field as={InputWithIcon} type="email" placeholder="yamada@example.com" name="email" title="メールアドレス" autoFocus />
      <ErrorMessage name="email" component={SpanErrorMessage} />
      <Field as={ButtonSubmit} name="submit" />
    </form>
  );
};

const FormEmail = withFormik<FormEmailType, FormEmailValues>({
  mapPropsToValues: ({ values }) => ({ email: '', ...values }),
  validationSchema: yup.object().shape({
    email: yup.string()
      .required('入力して下さい')
      .matches(/^([a-z0-9+_.-]+)@([a-z0-9-]+\.)+[a-z]{2,6}$/, '正しい形式で入力してください')
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit,
})(Form);

export default FormEmail;


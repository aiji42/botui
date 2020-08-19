import { FC } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import InputNumber from '../Elements/InputNumber';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { isValidNumber as isValidPhoneNumber } from 'libphonenumber-js';
import { customHandleSubmit, HandleSubmitProps } from './modules'

interface Values {
  tel: string
}

const Form: FC<FormikProps<Values> & HandleSubmitProps> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputNumber} name="tel" placeholder="09012345678" title="電話番号(ハイフン無し)" autoFocus />
      <ErrorMessage name="tel" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormTel = withFormik<HandleSubmitProps, Values>({
  mapPropsToValues: () => ({ tel: '' }),
  validationSchema: yup.object().shape({
    tel: yup.string()
      .matches(/^(0{1}\d{9,10})$/, '半角数字で正しく入力してください')
      .test('tel-format', '半角数字で正しく入力してください', (value) => value ? isValidPhoneNumber(value, 'JP') : false)
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormTel;
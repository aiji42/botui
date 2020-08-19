import { FC } from 'react';
import { withFormik, Field, FormikProps } from 'formik';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { customHandleSubmit, HandleSubmitProps } from './modules'

const base = css`
  color: #676879;
  border-radius: 5px;
  border: solid 2px #0f84fe;
  background-color: #fff;
  padding: 10px;
  line-height: 1.2em;
  font-size: 1.0em;
  h3 {
    margin 10px 0px 5px 0px;
  }
`;

interface Values {
  confirmed: boolean
}

interface Props {
  confirmHTML: string
}

const Form: FC<FormikProps<Values> & Props & HandleSubmitProps> = (props) => {
  const { handleSubmit, confirmHTML } = props;

  return (
    <form css={base} onSubmit={handleSubmit}>
      <Field component={ButtonSubmit} />
      <p css={{ textAlign: 'center', marginTop: 5 }}>下記の内容にお間違いなければボタンを押してください。</p>
      <div dangerouslySetInnerHTML={{ __html: confirmHTML }} />
      <Field name="confirmed" type="hidden" />
      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormConfirm = withFormik<Props & HandleSubmitProps, Values>({
  mapPropsToValues: () => ({ confirmed: true }),
  handleSubmit: customHandleSubmit
})(Form);

export default FormConfirm;
import React, { InputHTMLAttributes, FC } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import RadioInput from '../Elements/RadioInput';
import { css } from '@emotion/core';
import { customHandleSubmit, HandleSubmitProps } from './modules'

const style = {
  mergin: css({
    marginTop: 5
  })
}

interface Values {
  [x: string]: any
}

interface Props {
  name: string
  inputs: (InputHTMLAttributes<HTMLIFrameElement> & { title: string })[]
}

const Form: FC<FormikProps<Values> & Props & HandleSubmitProps> = (props) => {
  const { name, inputs, handleSubmit } = props;

  return (
    <form onChange={handleSubmit}>
      <Field name={name}>
        {inputs.map(({ title, ...attributes }, index) => (
          <div key={index} css={index > 0 ? style.mergin : ''}>
            <RadioInput title={title} {...attributes} name={name} />
          </div>
        ))}
      </Field>
      <ErrorMessage name={name} component={SpanErrorMessage} />
    </form>
  );
};

const FormCustomRadioGroup = withFormik<Props & HandleSubmitProps, Values>({
  mapPropsToValues: ({ name }) => ({ [name]: '' }),
  validationSchema: ({ name }: Props) => yup.object().shape({
    [name]: yup.string().required('選択してください')
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormCustomRadioGroup;
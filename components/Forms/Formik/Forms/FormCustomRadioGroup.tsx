import React, { FC } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import RadioInput from '../Elements/RadioInput';
import { css } from '@emotion/core';
import { customHandleSubmit } from './modules'
import { FormCustomRadioGroup as FormCustomRadioGroupType, FormCustomRadioGroupValues } from '../../../../@types/form';

const style = {
  mergin: css({
    marginTop: 5
  })
}

const Form: FC<FormikProps<FormCustomRadioGroupValues> & FormCustomRadioGroupType> = (props) => {
  const { name, inputs, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ title, ...attributes }, index) => (
        <div key={index} css={index > 0 ? style.mergin : ''}>
          <Field title={title} {...attributes} name={name} as={RadioInput} />
        </div>
      ))}
      <ErrorMessage name={name} component={SpanErrorMessage} />
    </form>
  );
};

const FormCustomRadioGroup = withFormik<FormCustomRadioGroupType, FormCustomRadioGroupValues>({
  mapPropsToValues: ({ name }) => ({ [name]: '' }),
  validationSchema: ({ name }: FormCustomRadioGroupType) => yup.object().shape({
    [name]: yup.string().required('選択してください')
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormCustomRadioGroup;
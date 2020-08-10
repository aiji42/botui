import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputName, * as inputName from '../Elements/InputName';
import InputNameKana, * as inputNameKana from '../Elements/InputNameKana';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import historykana from 'historykana';
import Moji from 'moji';

const formBlockDetailHalf = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 3px;
  width: 49%;
`;

const left = css`
  margin-right: 3px;
`;

const kanaHistories = {};
const refrectToKana = (fieldName, setFieldValue) => (e) => {
  if (!kanaHistories[fieldName]) kanaHistories[fieldName] = [];
  if (e.target.value) kanaHistories[fieldName].push(e.target.value);
  else kanaHistories[fieldName] = [];
  setFieldValue(fieldName, new Moji(historykana(kanaHistories[fieldName])).convert('HG', 'KK').toString());
};

const form = (props) => {
  const { handleSubmit, setFieldValue } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div css={[formBlockDetailHalf, left]}>
        <Field component={InputName} name="familyName" placeholder="山田" title="姓" autoFocus
          onKeyUp={refrectToKana('familyNameKana', setFieldValue)}
        />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalf}>
        <Field component={InputName} name="firstName" placeholder="太郎" title="名"
          onKeyUp={refrectToKana('firstNameKana', setFieldValue)}
        />
        <ErrorMessage name="firstName" component={SpanErrorMessage} />
      </div>
      <div css={[formBlockDetailHalf, left]}>
        <Field component={InputNameKana} name="familyNameKana" placeholder="ヤマダ" title="セイ" />
        <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalf}>
        <Field component={InputNameKana} name="firstNameKana" placeholder="タロウ" title="メイ" />
        <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
      </div>
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormName = withFormik({
  mapPropsToValues: () => ({
    ...inputName.initialValue('familyName'),
    ...inputNameKana.initialValue('familyNameKana'),
    ...inputName.initialValue('firstName'),
    ...inputNameKana.initialValue('firstNameKana'),
  }),
  validationSchema: yup.object().shape({
    ...inputName.validation('familyName'),
    ...inputNameKana.validation('familyNameKana'),
    ...inputName.validation('firstName'),
    ...inputNameKana.validation('firstNameKana'),
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormName;
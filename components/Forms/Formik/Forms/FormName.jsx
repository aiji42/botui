import React, { useEffect } from 'react';
import { withFormik, Field, ErrorMessage, useField } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputName from '../Elements/InputName';
import InputNameKana from '../Elements/InputNameKana';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { useKana } from 'react-use-kana'

const formBlockDetailHalf = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 3px;
  width: 49%;
`;

const left = css`
  margin-right: 3px;
`;

const toKatakana = (value) => value.normalize('NFKC')
  .replace(/[\u3041-\u3096]/g, (match) => String.fromCharCode(match.charCodeAt(0) + 0x60))
  .replace(/[^ァ-ン]/g, '')

const form = (props) => {
  const { handleSubmit } = props;
  const { kana: familyNameKana, setKanaSource: setFamilyNameKanaSource } = useKana()
  const { kana: firstNameKana, setKanaSource: setFirstNameKanaSource } = useKana()
  const [, , { setValue: setFamilyNameKana }] = useField('familyNameKana')
  const [, , { setValue: setFirstNameKana }] = useField('firstNameKana')

  useEffect(() => { setFamilyNameKana(toKatakana(familyNameKana)) }, [familyNameKana, setFamilyNameKana])
  useEffect(() => { setFirstNameKana(toKatakana(firstNameKana)) }, [firstNameKana, setFirstNameKana])

  return (
    <form onSubmit={handleSubmit}>
      <div css={[formBlockDetailHalf, left]}>
        <Field component={InputName} name="familyName" placeholder="山田" title="姓" autoFocus
          onKeyUp={(e) => setFamilyNameKanaSource(e.target.value)}
        />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={formBlockDetailHalf}>
        <Field component={InputName} name="firstName" placeholder="太郎" title="名"
          onKeyUp={(e) => setFirstNameKanaSource(e.target.value)}
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
    familyName: '',
    familyNameKana: '',
    firstName: '',
    firstNameKana: '',
  }),
  validationSchema: yup.object().shape({
    familyName: yup.string().required('入力してください').max(50, '入力内容が長すぎます'),
    familyNameKana: yup.string()
      .required('入力してください')
      .max(50, '入力内容が長すぎます')
      .matches(/^[ァ-ヶ]+$/, '全角カナで入力してください'),
    firstName: yup.string().required('入力してください').max(50, '入力内容が長すぎます'),
    firstNameKana: yup.string()
      .required('入力してください')
      .max(50, '入力内容が長すぎます')
      .matches(/^[ァ-ヶ]+$/, '全角カナで入力してください'),
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
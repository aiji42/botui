import React, { useRef, useEffect } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputNumber from '../Elements/InputNumber';
import SelectPref, * as pref from '../Elements/SelectPref';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { usePostalJp } from 'use-postal-jp'

const form = (props) => {
  const { handleSubmit } = props;

  const { address, sanitizedCode, setPostalCode } = usePostalJp()
  const [, postalCodeMeta, postalCodeHelper] = useField('postalCode')
  const [, , prefHelper] = useField('pref')
  const [, , cityHelper] = useField('city')

  const inputStreetEl = useRef(null);

  useEffect(() => {
    const { prefectureCode, address1, address2, address3, address4 } = address
    if (prefectureCode) prefHelper.setValue(prefectureCode)
    if (address1) cityHelper.setValue(address1 + address2 + address3 + address4)
  }, [address, prefHelper.setValue, cityHelper.setValue])

  useEffect(() => {
    setPostalCode(postalCodeMeta.value)
  }, [setPostalCode, postalCodeMeta.value]);

  useEffect(() => {
    if (sanitizedCode.length !== 7) return
    postalCodeHelper.setValue(sanitizedCode)
    inputStreetEl.current.focus()
  }, [sanitizedCode, postalCodeHelper.setValue])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputNumber} name="postalCode" placeholder="1500002" title="郵便番号" autoFocus/>
      <ErrorMessage name="postalCode" component={SpanErrorMessage} />

      <Field component={SelectPref} name="pref" title="都道府県" />
      <ErrorMessage name="pref" component={SpanErrorMessage} />

      <Field component={InputWithIcon} type="text" placeholder="〇〇市〇〇町" name="city" title="市区町村" />
      <ErrorMessage name="city" component={SpanErrorMessage} />

      <Field component={InputWithIcon} type="text" placeholder="1-2-3" innerRef={inputStreetEl} name="street" title="番地・マンション名・部屋番号" />
      <ErrorMessage name="street" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormAddress = withFormik({
  mapPropsToValues: () => ({
    postalCode: '',
    ...pref.initialValue('pref'),
    city: '',
    street: '',
  }),
  validationSchema: yup.object().shape({
    postalCode: yup.string().required('入力してください').matches(/^\d{7}$/, '7桁の数字で正しく入力してください'),
    ...pref.validation('pref'),
    city: yup.string().required('入力してください').max(200, '入力内容が長すぎます'),
    street: yup.string().required('入力してください').max(200, '入力内容が長すぎます')
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

export default FormAddress;
import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue } from '../../../../dataStore';

const prefs = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県',
  '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県',
  '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県',
  '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
  '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const SelectPref = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      <option value=""></option>
      {prefs.map((title, index) => (<option key={index + 1} value={index + 1}>{title}</option>))}
    </SelectWithIcon>
  );
};

SelectPref.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectPref;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });
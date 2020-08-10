import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, baseBorderColor } from '../../shared/baseStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

const base = css`
  font-size: 1.1em;
  border-radius: 3px;
  background-color: #ffffff;
  display: table;
  width: 100%;
  box-sizing: border-box;
  span {
    vertical-align: middle;
    display: inline-block;
    width: 75%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const input = css`
  display: none;
`;

const icon = css`
  vertical-align: middle;
  display: inline-block;
  margin: 13px;
`;

const unCheckedIcon = css`
  color: gray;
`;

const checkedIcon = css`
  color: ${okColor};
`;

const unCheckedStyle = css`
  border: solid 2px ${baseBorderColor};
  background-color: #ffffff;
`;

const checkedStyle = css`
  border: solid 3px ${okColor};
  background-color: #fffdcf;
`;

const RadioInput = ({ field, form, id, ...props }) => {
  const checked = id === form.values[field.name];

  return (
    <div>
      <label css={[base, (checked ? checkedStyle : unCheckedStyle)]}>
        <div css={[icon, (checked ? checkedIcon : unCheckedIcon)]}>
          {checked ? <FontAwesomeIcon icon={faDotCircle} /> : <FontAwesomeIcon icon={faCircle} />}
        </div>
        <span>{props.title}</span>
        <input {...field} {...props} value={id} type="radio" css={input} checked={checked} />
      </label>
    </div>
  );
};

RadioInput.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default RadioInput;
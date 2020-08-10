import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, errorColor, baseBorderColor } from '../../shared/baseStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const base = css`
  padding: 8px 25px 8px 8px;
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  font-size: 1.1em;
  font-weight: normal;
  color: #000;
  margin-bottom: 0px;
  box-sizing: border-box;
  &:focus {
    border-left-width 5px;
    transition: all 300ms 0s ease;
  }
`;

const title = css`
  font-size: 0.9em;
  line-height: 1;
  padding-top: 6px;
  padding-bottom: 4px;
`;

const noValue = css`
  color: rgb(0,0,0,0.5);
`;

const isOk = css`
  border: solid 2px ${okColor};
`;
const noTouched = css`
  border: solid 2px ${baseBorderColor};
`;

const withError = css`
  border: solid 2px ${errorColor};
`;

const okIcon = css`
  float: right;
  position: relative;
  right: 5px;
  top: -31px;
  height: 0px;
  color: ${okColor};
`;

const style = ({ form, field }) => {
  const styles = [base];
  const { name, value } = field;
  const { errors, touched, initialValues } = form;
  if (!value && errors[name]) styles.push(noValue);
  if (!errors[name]) return [...styles, isOk];
  if (!touched[name] && errors[name] && initialValues[name].length === 0) return [...styles, noTouched];
  if (errors[name]) return [...styles, withError];
};

const SelectWithIcon = ({ field, form, children, ...props }) => {
  return (
    <>
      <div css={title}>{props.title}</div>
      <select {...field} {...props} css={style({ form, field })} >
        {children}
      </select>
      {!form.errors[field.name] &&
        <div css={okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      }
    </>
  );
};

SelectWithIcon.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
};

export default SelectWithIcon;
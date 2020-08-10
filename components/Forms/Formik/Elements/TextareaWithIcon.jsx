import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import { css } from '@emotion/core';
import { okColor, errorColor, baseBorderColor } from '../../shared/baseStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

const base = css`
  padding: 8px 25px 8px 8px;
  border-radius: 3px;
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  font-size: 1.05em;
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
  color: ${okColor};
  height: 0px;
`;

const style = ({ form, field }) => {
  const { name } = field;
  const { errors, touched, initialValues } = form;
  if (!errors[name]) return [base, isOk];
  if (!touched[name] && errors[name] && initialValues[name].length === 0) return [base, noTouched];
  if (errors[name]) return [base, withError];
};

const TextareaWithIcon = ({ field, form, autoFocus, ...props }) => {
  const [minRows, setMinRows] = useState(0);

  return (
    <>
      <div css={title}>{props.title}</div>
      <TextareaAutosize {...field} {...props} minRows={minRows} css={style({ form, field })} autoFocus={autoFocus}
        onFocus={() => setMinRows(2)}
        onBlur={(e) => {
          field.onBlur(e);
          setMinRows(0);
        }}
      />
      {!form.errors[field.name] &&
        <div css={okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      }
    </>
  );
};

TextareaWithIcon.defaultProps = {
  autoFocus: false
};

TextareaWithIcon.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  autoFocus: PropTypes.bool.isRequired
};

export default TextareaWithIcon;
import { FC, useState, useEffect, InputHTMLAttributes } from 'react';
import Button from './Button';
import { findStoredValue, dataStore } from '../../../../dataStore';
import { useField, useFormikContext, FormikValues, FieldAttributes } from 'formik';

const isSubmitedOnce = (values: FormikValues): boolean => Object.keys(values).every(key => dataStore[key] !== null);
const isModified = (values: FormikValues): boolean => Object.keys(values).some(key => findStoredValue(key) !== values[key]);

type Props = FieldAttributes<any> & InputHTMLAttributes<Element>

const ButtonSubmit: FC<Props> = ({ children, ...props }) => {
  const [modified, setModified] = useState<boolean>(false);
  const [submitedOnce, setSubmitedOnce] = useState<boolean>(false);
  const [field] = useField(props)
  const { values, isValid, isSubmitting } = useFormikContext<FormikValues>()
  useEffect(() => { Object.keys(values).forEach(key => dataStore[key] = null); }, []);
  useEffect(() => { setModified(isModified(values)); }, [values]);
  useEffect(() => {
    if (isSubmitting) return;
    setModified(false);
    setSubmitedOnce(isSubmitedOnce(values));
  }, [isSubmitting]);

  const disabled = Object.keys(values).length > 0 && (!isValid || (submitedOnce && !modified));

  return (
    <Button type="submit" {...field} {...props} disabled={disabled}>
      {children || (submitedOnce && modified ? '変更' : '次へ')}
    </Button>
  );
};

export default ButtonSubmit;
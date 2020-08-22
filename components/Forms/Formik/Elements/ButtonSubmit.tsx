import { FC, useState, useEffect, ButtonHTMLAttributes } from 'react';
import Button from './Button';
// import { findStoredValue, dataStore } from '../../../../dataStore';
import { useFormikContext, FormikValues } from 'formik';

const dataStore: { [x: string]: any } = {}
const findStoredValue = (arg: any): any => arg

const isSubmitedOnce = (values: FormikValues): boolean => Object.keys(values).every(key => dataStore[key] !== null);
const isModified = (values: FormikValues): boolean => Object.keys(values).some(key => findStoredValue(key) !== values[key]);

const ButtonSubmit: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  const [modified, setModified] = useState<boolean>(false);
  const [submitedOnce, setSubmitedOnce] = useState<boolean>(false);
  const { values, isValid, isSubmitting } = useFormikContext<any>()
  useEffect(() => { Object.keys(values).forEach(key => dataStore[key] = null); }, []);
  useEffect(() => { setModified(isModified(values)); }, [values]);
  useEffect(() => {
    if (isSubmitting) return;
    setModified(false);
    setSubmitedOnce(isSubmitedOnce(values));
  }, [isSubmitting]);

  const disabled = Object.keys(values).length > 0 && (!isValid || (submitedOnce && !modified));

  return (
    <Button type="submit" {...props} disabled={disabled}>
      {children || (submitedOnce && modified ? '変更' : '次へ')}
    </Button>
  );
};

export default ButtonSubmit;
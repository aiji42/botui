import { FC, useEffect } from 'react';
import { useField } from 'formik'
import InputWithIcon from './InputWithIcon';
import Moji from 'moji';

const onlyNum = (value: string | number): string => (new Moji(`${value}`)).convert('ZE', 'HE').toString().replace(/[^0-9]/g, '');

type Props = {
  name: string
}

const InputNumber: FC<Props> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers
  const { value } = meta

  useEffect(() => {
    setValue(onlyNum(value));
  }, [value]);

  return (
    <InputWithIcon type="tel" {...props} />
  );
};

export default InputNumber;
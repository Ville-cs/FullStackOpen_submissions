import { useState } from 'react';
import { InputEvent } from './types';

export const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  const onReset = () => setValue('');

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export const useRadioInput = (kind: string, name: string) => {
  return {
    type: 'radio',
    value: kind,
    id: kind,
    name,
  };
};

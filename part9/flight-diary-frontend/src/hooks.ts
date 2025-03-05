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

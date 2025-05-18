import { ChangeEvent } from 'react';
import { useState } from 'react';

type InputEvent = ChangeEvent<HTMLInputElement>;

export const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

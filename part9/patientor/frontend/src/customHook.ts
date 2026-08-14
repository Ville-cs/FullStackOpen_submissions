import type { ChangeEvent } from "react";
import { useState } from "react";

type InputEvent = ChangeEvent<HTMLInputElement>;

export type Field = ReturnType<typeof useField>;

export const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: InputEvent) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

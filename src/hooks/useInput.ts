import { ChangeEvent, useCallback, useState } from 'react';

type TypingElement = HTMLInputElement | HTMLTextAreaElement;

export const useInput = (defaultValue: string) => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange = useCallback((e: ChangeEvent<TypingElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return { value, onChange, setValue } as const;
};

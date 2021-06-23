import { useCallback, useState } from 'react';

export const useBool = (defaultValue: boolean) => {
  const [bool, setBool] = useState<boolean>(defaultValue);

  const onTrue = useCallback(() => {
    setBool(true);
  }, []);

  const onFalse = useCallback(() => {
    setBool(false);
  }, []);

  return { bool, onTrue, onFalse } as const;
};

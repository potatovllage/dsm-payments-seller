import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean) => {
  const [toggle, setToggle] = useState<boolean>(defaultValue);

  const onToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return { toggle, onToggle } as const;
};

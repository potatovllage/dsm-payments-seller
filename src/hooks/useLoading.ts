import { useCallback } from 'react';

import { useBool } from './useBool';

export const useLoading = (defaultValue: boolean) => {
  const { bool, onTrue, onFalse } = useBool(defaultValue);

  const startLoading = useCallback(onTrue, []);

  const endLoading = useCallback(onFalse, []);

  return { loading: bool, startLoading, endLoading } as const;
};

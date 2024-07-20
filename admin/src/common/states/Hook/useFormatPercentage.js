import { useCallback } from 'react';

const useFormatPercentage = () => {
  const formatPercentage = useCallback((number) => {
    return number.toFixed(2).replace('.', ',') + '%';
  }, []);

  return { formatPercentage };
};

export default useFormatPercentage;

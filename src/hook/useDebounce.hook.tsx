import { useEffect, useRef } from 'react';

const useDebounce = <T,>(
  callBack: () => void,
  debounceTime = 500,
  dependencies: T[],
) => {
  const previous = useRef<any>();
  useEffect(() => {
    previous.current = setTimeout(callBack, debounceTime);

    return () => {
      clearTimeout(previous.current);
    };
  }, [...dependencies, debounceTime]);
};

export default useDebounce;

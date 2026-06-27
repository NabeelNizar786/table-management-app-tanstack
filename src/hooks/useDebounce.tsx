import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, SetDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

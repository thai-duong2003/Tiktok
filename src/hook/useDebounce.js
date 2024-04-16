import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debounce, setdebounce] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setdebounce(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value]);

  return debounce;
}
export default useDebounce;

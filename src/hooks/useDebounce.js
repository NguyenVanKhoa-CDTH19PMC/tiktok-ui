const { useState, useEffect } = require('react');

function useDebounce(value, delay) {
  const [debounceValue, setDebaounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebaounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debounceValue;
}
export default useDebounce;

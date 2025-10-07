import { useEffect } from "react";

export function useClickOutside(refs, handler) {
  useEffect(() => {
    function handleClick(event) {
      const clickedOutside = refs.every((ref) => {
        return !ref.current || !ref.current.contains(event.target);
      });

      if (clickedOutside) {
        handler(event);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

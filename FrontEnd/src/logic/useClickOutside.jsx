import { useEffect } from "react";

export function useClickOutside(targetRefs, toggleButtonRef, handler) {
  useEffect(() => {
    function handleClick(event) {
      const clickedOutside = targetRefs.every((ref) => {
        if (!ref.current) return true; // nếu ref chưa gán thì coi như "bên ngoài"
        return !ref.current.contains(event.target);
      });
      const clickedToggle =
        toggleButtonRef.current &&
        toggleButtonRef.current.contains(event.target);

      if (clickedOutside || clickedToggle) {
        handler(event);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [targetRefs, toggleButtonRef, handler]);
}

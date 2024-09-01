import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handle: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      }
      handle(e);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handle]);
}
export default useClickOutside;

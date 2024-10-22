import { useEffect, useRef } from "react";

interface UseOutsideClickReturn {
  ref: React.RefObject<HTMLDivElement>;
}

interface UseOutsideClickProps {
  close: () => void;
}

const useOutsideClick = ({ close }: UseOutsideClickProps): UseOutsideClickReturn => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  return {
    ref,
  };
};

export default useOutsideClick;

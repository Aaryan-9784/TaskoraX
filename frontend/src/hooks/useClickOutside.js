import { useEffect, useRef } from 'react';

export const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handler]);

  return domNode;
};

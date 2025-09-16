import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const div = React.useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, [div]);

  return createPortal(children, div);
};

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import type { ClientPortalComponent } from './ClientPortal.types.ts';

export const ClientPortal: ClientPortalComponent = ({ children, selector, show }) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};

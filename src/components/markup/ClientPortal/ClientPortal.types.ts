import type { FC, ReactNode } from 'react';

interface ClientPortalProps {
  children: ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
}

export type ClientPortalComponent = FC<ClientPortalProps>;

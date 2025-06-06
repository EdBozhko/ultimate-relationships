export interface GameStore {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  isBraVisible: boolean;
  toggleBraVisible: () => void;

  isCorsetVisible: boolean;
  toggleCorsetVisible: () => void;

  isPantiesVisible: boolean;
  togglePantiesVisible: () => void;

  isSkirtVisible: boolean;
  toggleSkirtVisible: () => void;

  isThighStrapsVisible: boolean;
  toggleThighStrapsVisible: () => void;
}

export interface GlobalStore {
  isAdditionalMenuOpened: boolean;
  closeAdditionalMenu: () => void;
  openAdditionalMenu: () => void;
  toggleAdditionalMenu: () => void;

  isDebugMode: boolean;
  debugMode: () => void;
  userMode: () => void;

  isDebugPerfMode: boolean;
  debugPerfMode: () => void;
  userPerfMode: () => void;
}

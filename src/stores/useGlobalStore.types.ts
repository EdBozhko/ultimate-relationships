export interface GlobalStore {
  isDebugMode: boolean;
  debugMode: () => void;
  userMode: () => void;
  isDebugPerfMode: boolean;
  debugPerfMode: () => void;
  userPerfMode: () => void;
}

import { useMemo } from 'react';
import {
  LoadingBarContainer,
  LoadingBarCounter,
  SVG,
  Background,
  Meter,
  DisplayProgress,
  InfoContainer,
  LinearGradient,
} from './LoadingBar.styles.ts';

export const LoadingBar = ({ progress = 0, loaded = 0, totalLoaded = 0, hide = false }) => {
  // Memoize `loadingStatus` to avoid unnecessary re-renders
  const loadingStatus = useMemo(() => (progress === 100 ? 'done' : 'in progress'), [progress]);

  // Precompute `strokeDashoffset` to prevent inline calculations
  const strokeDashoffset = useMemo(() => ((100 - progress) / 100) * 3.14 * 150, [progress]);

  return (
    <LoadingBarContainer $hide={hide}>
      <SVG>
        <defs>
          <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='-6.77%' stopColor='#595FF3' />
            <stop offset='57.09%' stopColor='#E14ADF' />
            <stop offset='118.35%' stopColor='#d02fe2' />
          </LinearGradient>
        </defs>
        <Background cx='50%' cy='50%' r='50%' />
        <Meter stroke='url(#gradient)' cx='50%' cy='50%' r='50%' $strokeDashoffset={strokeDashoffset} />
      </SVG>
      <InfoContainer>
        <LoadingBarCounter>{`${Math.floor(progress)}%`}</LoadingBarCounter>
        <DisplayProgress>{`${loadingStatus}`}</DisplayProgress>
        <DisplayProgress>{`${loaded}/${totalLoaded}`}</DisplayProgress>
      </InfoContainer>
    </LoadingBarContainer>
  );
};

import { useEffect, useState } from 'react';
import {
  LoadingBarContainer,
  LoadingBarCounter,
  SVG,
  Background,
  Meter,
  LinearGradient,
  DisplayProgress,
  InfoContainer,
} from './LoadingBar.styles.ts';

export const LoadingBar = ({ progress = 0, loaded = 0, totalLoaded = 0 }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('in progress');
  useEffect(() => {
    if (progress > currentProgress) {
      setCurrentProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    if (loaded === totalLoaded) {
      setLoadingStatus('done');
    }
  }, [loaded]);

  return (
    <LoadingBarContainer>
      <SVG>
        <defs>
          <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='-6.77%' stopColor='#595FF3' />
            <stop offset='57.09%' stopColor='#E14ADF' />
            <stop offset='118.35%' stopColor='#d02fe2' />
          </LinearGradient>
        </defs>
        <Background cx='50%' cy='50%' r='50%' />
        <Meter stroke='url(#gradient)' cx='50%' cy='50%' r='50%' $strokeDashoffset={currentProgress} />
      </SVG>
      <InfoContainer>
        <LoadingBarCounter>{`${Math.floor(currentProgress)}%`}</LoadingBarCounter>
        <DisplayProgress>{`${loadingStatus}`}</DisplayProgress>
        <DisplayProgress>{`${loaded}/${totalLoaded}`}</DisplayProgress>
      </InfoContainer>
    </LoadingBarContainer>
  );
};

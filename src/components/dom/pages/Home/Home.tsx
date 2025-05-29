'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@react-three/drei';

import { PAGES } from '@src/utils/constants.ts';
import { ClientPortal } from '@src/components/dom/ClientPortal/index.tsx';
import { PopUp } from '@src/components/dom/PopUp/index.tsx';
import { PopUpTitle, PopUpText, PopUpButtonsContainer, PopUpLink } from '@src/components/dom/PopUp/PopUp.styles.ts';
import { LoadingBar } from '@src/components/dom/LoadingBar/index.tsx';
import { Container } from './Home.styles.ts';

import type { HomeComponent } from './Home.types.ts';

export const Home: HomeComponent = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const isAgeConfirmed = localStorage.getItem('ageConfirmed');
    if (isAgeConfirmed) {
      router.push(PAGES.SETTINGS);
    }
  }

  const [hideLoadingBar, setHideLoadingBar] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentLoadingProgress, setCurrentLoadingProgress] = useState(0);
  const loadingProgress = useProgress((state) => state.progress);
  const loaded = useProgress((state) => state.loaded);
  const totalLoaded = useProgress((state) => state.total);

  const onAgeConfirmButtonClick = () => {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
      //@ts-expect-error
    } else if (document.body.webkitRequestFullscreen) {
      //@ts-expect-error
      document.body.webkitRequestFullscreen();
    }

    if (typeof window !== 'undefined') {
      const isAgeConfirmed = localStorage.getItem('ageConfirmed');
      if (!isAgeConfirmed) {
        localStorage.setItem('ageConfirmed', 'true');
      }
    }
  };

  useEffect(() => {
    let loadingProgressTimeout: ReturnType<typeof setTimeout>;

    if (loadingProgress > currentLoadingProgress) {
      setCurrentLoadingProgress(loadingProgress);
    }

    if (loadingProgress === 100) {
      loadingProgressTimeout = setTimeout(() => {
        setHideLoadingBar(true);
      }, 2000);
    }

    return () => clearTimeout(loadingProgressTimeout);
  }, [loadingProgress]);

  useEffect(() => {
    let showPopUpTimeout: ReturnType<typeof setTimeout>;

    if (hideLoadingBar === true) {
      showPopUpTimeout = setTimeout(() => {
        setShowPopUp(true);
      }, 1000);
    }

    return () => clearTimeout(showPopUpTimeout);
  }, [hideLoadingBar]);

  return (
    <Container>
      <LoadingBar hide={hideLoadingBar} progress={currentLoadingProgress} loaded={loaded} totalLoaded={totalLoaded} />
      <ClientPortal selector='client-portal' show={showPopUp}>
        <PopUp show={showPopUp}>
          <PopUpTitle>This is an adult website</PopUpTitle>
          <PopUpText>
            This website contains age-restricted materials including nudity and explicit depictions of sexual activity.
            By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you
            are accessing the website from and you consent to viewing sexually explicit content.
          </PopUpText>
          <PopUpButtonsContainer>
            <PopUpLink href='/game' onClick={onAgeConfirmButtonClick}>
              I am 18 or older - Enter
            </PopUpLink>
            <PopUpLink href='https://google.com'>I am under 18 - Exit</PopUpLink>
          </PopUpButtonsContainer>
        </PopUp>
      </ClientPortal>
    </Container>
  );
};

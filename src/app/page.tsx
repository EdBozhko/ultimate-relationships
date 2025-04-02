'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

import { ClientPortal } from '@comp/markup/ClientPortal';
import { PopUp } from '@comp/markup/PopUp';
import { PopUpTitle, PopUpText, PopUpButtonsContainer, PopUpLink } from '@comp/markup/PopUp/PopUp.styles.ts';
import { LoadingBar } from '@comp/markup/LoadingBar/';

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const loadingProgress = useProgress((state) => state.progress);
  const loaded = useProgress((state) => state.loaded);
  const totalLoaded = useProgress((state) => state.total);

  useEffect(() => {
    if (loaded === totalLoaded) {
      setTimeout(() => {
        setShowPopUp(true);
      }, 3000);
    }
  }, [loadingProgress]);

  return (
    <>
      {!showPopUp && <LoadingBar progress={loadingProgress} loaded={loaded} totalLoaded={totalLoaded} />}
      <ClientPortal selector='client-portal' show={showPopUp}>
        <PopUp>
          <PopUpTitle>This is an adult website</PopUpTitle>
          <PopUpText>
            This website contains age-restricted materials including nudity and explicit depictions of sexual activity.
            By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you
            are accessing the website from and you consent to viewing sexually explicit content.
          </PopUpText>
          <PopUpButtonsContainer>
            <PopUpLink href='/game'>I am 18 or older - Enter</PopUpLink>
            <PopUpLink href='https://google.com'>I am under 18 - Exit</PopUpLink>
          </PopUpButtonsContainer>
        </PopUp>
      </ClientPortal>
    </>
  );
};

export default Home;

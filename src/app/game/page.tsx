'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@src/components/experience/Scene'), { ssr: false });
const MainExperience = dynamic(() => import('@comp/experience/MainExperience'), { ssr: false });

const Game = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 0],
        }}
        shadows={true}
        eventPrefix='client'
      >
        <MainExperience />
        {children}
      </Scene>
    </>
  );
};

export default Game;

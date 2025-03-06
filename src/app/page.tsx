'use client';

import dynamic from 'next/dynamic';
const Scene = dynamic(() => import('@src/components/Scene'), { ssr: false });
const MainExperience = dynamic(() => import('@comp/Experience/MainExperience'), { ssr: false });

const Home = ({ children }: { children: React.ReactNode }) => {
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
          position: [3, 2, 6],
        }}
        shadows={true}
        eventPrefix='client'
      >
        <MainExperience />
      </Scene>
    </>
  );
};

export default Home;

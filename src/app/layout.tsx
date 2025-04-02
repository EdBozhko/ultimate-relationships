'use client';

import { Ubuntu } from 'next/font/google';
import { StyledComponentsRegistry } from '@helpers/lib/registry.tsx';
import GlobalStyle from '@themeConfigs/global.style';
import { NextFont } from 'next/dist/compiled/@next/font';
import { useGLTF } from '@react-three/drei';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useGlobalStore from '@src/stores/useGlobalStore';

import { Header } from '@src/components/markup/Header';
import { Main } from '@src/components/markup/Main';
import { useViewportHeightFix } from '@src/hooks/useViewportHeightFix';

// import basePartnerModelSrc from '@public/models/base_partner/base_partner.glb';

const ubuntu: NextFont = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '500', '700'],
  display: 'swap',
  style: 'normal',
});

const title: string = 'Perfect AI Partner';
const url: string = 'https://perfect-ai-partner.com/';
const description: string = 'Perfect AI Partner';
const author: string = 'EdBozhko';
const twitter: string = '@';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isDebugMode = Boolean(useSearchParams().get('debug-mode'));
  const debugMode = useGlobalStore((state) => state.debugMode);
  const userMode = useGlobalStore((state) => state.userMode);

  const isDebugPerfMode = Boolean(useSearchParams().get('debug-perf-mode'));
  const debugPerfMode = useGlobalStore((state) => state.debugPerfMode);
  const userPerfMode = useGlobalStore((state) => state.userPerfMode);

  const [headerHeight, setHeaderHeight] = useState(null);

  const headerRef = useRef(null);

  useEffect(() => {
    isDebugMode ? debugMode() : userMode();
    isDebugPerfMode ? debugPerfMode() : userPerfMode();
  }, []);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  useViewportHeightFix();

  return (
    <html lang='en' className='antialiased'>
      <head>
        {/* Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* SEO Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='Software Engineer,Product Manager,Project Manager,Data Scientist,Computer Scientist'
        />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />

        {/* Facebook Open Graph */}
        <meta property='og:title' content={title} />
        <meta property='og:type' content='site' />
        <meta property='og:url' content={url} />
        <meta property='og:site_name' content={title} />
        <meta property='og:description' content={description} />

        {/* Mobile Meta Tags */}
        <meta name='format-detection' content='telephone=yes' />
        <meta name='HandheldFriendly' content='true' />
        <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
        <meta name='theme-color' content='#000' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content={twitter} />
      </head>
      <body className={ubuntu.className}>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <Header ref={headerRef} />
          <Main headerHeight={headerHeight}>
            {children}

            <div id='client-portal' />
          </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;

useGLTF.preload('/models/base_partner/base_partner.glb');
useGLTF.preload('/models/strip_club/strip_club.glb');

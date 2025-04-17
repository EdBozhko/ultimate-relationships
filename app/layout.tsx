import { Ubuntu } from 'next/font/google';
import { StyledComponentsRegistry } from '@helpers/lib/registry.tsx';
import GlobalStyle from '@themeConfigs/global.style.ts';
import { NextFont } from 'next/dist/compiled/@next/font';

import { Header } from '@src/components/dom/Header';
import { GlobalClientPreload } from '@src/components/dom/GlobalClientPreload/';
import { MainLayout } from '@src/components/dom/Layouts/MainLayout';

import type { FC, ReactNode } from 'react';

const ubuntu: NextFont = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '500', '700'],
  display: 'swap',
  style: 'normal',
});

// Virtual AI companion
const title: string = 'Perfect AI Partner';
const url: string = 'https://perfect-ai-partner.com/';
const description: string = 'Perfect AI Partner';
const author: string = 'EdBozhko';
const twitter: string = '@';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
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
            <MainLayout>
              <Header />
              <main>
                {children}
                <div id='client-portal' />
              </main>
            </MainLayout>
          </StyledComponentsRegistry>
          <GlobalClientPreload />
        </body>
      </html>
    </>
  );
};

export default RootLayout;

import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { StyledComponentsRegistry } from '@helpers/lib/registry.tsx';
import GlobalStyle from '@themeConfigs/global.style';

const ubuntu = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '500', '700'],
  display: 'swap',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Ultimate relationships with AI',
  description: 'Ultimate relationships with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body className={ubuntu.className}>
        <GlobalStyle />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

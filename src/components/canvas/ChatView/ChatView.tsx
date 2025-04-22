'use client';
import dynamic from 'next/dynamic';

const ChatViewStyled = dynamic(() => import('./ChatView.styles.ts').then((mod) => mod.ChatViewStyled), {
  ssr: false,
});

const Content = dynamic(() => import('./components/Content').then((mod) => mod.Content), {
  ssr: false,
});

export const ChatView = () => {
  return (
    <ChatViewStyled orbitControls>
      <Content />
    </ChatViewStyled>
  );
};

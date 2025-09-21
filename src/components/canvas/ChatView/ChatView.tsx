'use client';
import dynamic from 'next/dynamic';

const ChatViewStyled = dynamic(() => import('./ChatView.styles.ts').then((mod) => mod.ChatViewStyled), {
  ssr: false,
});

const Content = dynamic(() => import('./components/Content').then((mod) => mod.Content), {
  ssr: false,
});

export const ChatView = ({ currentAnimation }: { currentAnimation?: string }) => {
  return (
    <ChatViewStyled orbitControls>
      <Content currentAnimation={currentAnimation} />
    </ChatViewStyled>
  );
};

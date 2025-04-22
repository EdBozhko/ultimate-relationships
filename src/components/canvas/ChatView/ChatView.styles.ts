import styled from 'styled-components';
import dynamic from 'next/dynamic';
const View = dynamic(() => import('@src/components/canvas/View/View.tsx').then((mod) => mod.View), { ssr: false });

export const ChatViewStyled = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

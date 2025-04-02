import { MainContainer, Container } from './Main.styles.ts';

export const Main = ({ children, headerHeight }) => {
  return (
    <MainContainer $headerHeight={headerHeight}>
      <Container>{children}</Container>
    </MainContainer>
  );
};

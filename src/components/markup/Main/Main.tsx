import { MainContainer, Container } from './Main.styles.ts';

import type { MainComponent } from './Main.types.ts';

export const Main: MainComponent = ({ children, headerHeight }) => {
  return (
    <MainContainer $headerHeight={headerHeight}>
      <Container>{children}</Container>
    </MainContainer>
  );
};

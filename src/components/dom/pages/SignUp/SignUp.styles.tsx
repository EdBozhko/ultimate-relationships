import styled from 'styled-components';
import { ThreeDimensionalButton } from '@comp/dom/ThreeDimensionalButton';
import { SCREENS } from '@themeConfigs/constants/screen.ts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 0 16rem 0;

  @media ${SCREENS.fullHd} {
    padding: 0 20%;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  margin: 10rem 0 0 0;
  padding: 0 16rem;
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  @media ${SCREENS.fullHd} {
    &:not(:first-of-type) {
      padding: 0 25%;
    }
  }
`;

export const Submit = styled(ThreeDimensionalButton)`
  align-self: center;
  margin: 20rem 0 0 0;

  @media ${SCREENS.fullHd} {
    font-size: 30rem;
  }
`;

export const Title = styled.p`
  color: #8de3fc;
  font-size: 20rem;
  margin: 10rem 0;

  span {
    text-transform: uppercase;
    font-weight: 300;
    color: #ffffff;
  }

  @media ${SCREENS.fullHd} {
    font-size: 30rem;
  }
`;

export const TariffPlanList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 20rem;
  margin: 0 0 20rem 0;

  @media ${SCREENS.fullHd} {
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }
`;

export const TariffPlanLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  min-height: 100%;

  font: inherit;
  font-size: 20rem;
  line-height: 1.2;

  color: #f0ffff;

  border-radius: 6rem;
  padding: 16rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
  }
`;

export const TariffPlan = styled.input`
  display: none;

  &:checked + ${TariffPlanLabel} {
    border: 1px solid #c295c0;
    box-shadow:
      0 0 7px #c295c0,
      0 0 10px #c295c0;

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

export const TariffPlanTitle = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-size: 22rem;

  @media ${SCREENS.fullHd} {
    font-size: 35rem;
  }
`;

export const TariffPlanPeriod = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;

  @media ${SCREENS.fullHd} {
    font-size: 24rem;
  }
`;

export const TariffPlanDescription = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;
  font-size: 16rem;

  @media ${SCREENS.fullHd} {
    font-size: 20rem;
  }
`;

export const TariffPrice = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;

  span {
    font-size: 24rem;
    color: #c295c0;
  }

  @media ${SCREENS.fullHd} {
    font-size: 30rem;

    span {
      font-size: 34rem;
      color: #c295c0;
    }
  }
`;

export const TariffPlanListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const TextInputContainer = styled.div`
  width: 100%;
  flex: 1 1 auto;
  border-radius: 10rem;
  padding: 7rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const TextInput = styled.input`
  font: inherit;
  font-size: 20rem;
  line-height: 1.2;
  outline: none;
  resize: none;
  color: #f0ffff;
  width: 100%;
  height: auto;
  background-color: transparent;

  &::placeholder {
    color: #656565;
  }
`;

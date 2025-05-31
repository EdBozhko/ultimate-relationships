import styled from 'styled-components';
import { ThreeDimensionalButton } from '@comp/dom/ThreeDimensionalButton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 0 16rem 0;
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
`;

export const Submit = styled(ThreeDimensionalButton)`
  align-self: center;
  margin: 20rem 0 0 0;
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
`;

export const TariffPlanList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const TariffPlanLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  font: inherit;
  font-size: 20rem;
  line-height: 1.2;

  color: #f0ffff;

  border-radius: 6rem;
  padding: 16rem;
  margin: 0 0 20rem 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
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
`;

export const TariffPlanPeriod = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;
`;

export const TariffPlanDescription = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;
  font-size: 16rem;
`;

export const TariffPrice = styled.p`
  margin: 0 0 5rem 0;
  padding: 0;
  font-weight: 300;

  span {
    font-size: 24rem;
    color: #c295c0;
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

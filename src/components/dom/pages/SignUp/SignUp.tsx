import {
  Block,
  Container,
  TextInputContainer,
  TextInput,
  Form,
  FormContainer,
  Submit,
  TariffPlan,
  TariffPlanDescription,
  TariffPlanPeriod,
  TariffPlanTitle,
  TariffPrice,
  TariffPlanLabel,
  TariffPlanList,
  TariffPlanListItem,
  Title,
} from './SignUp.styles.tsx';
import { PageHeading } from '@comp/dom/PageHeading/PageHeading.tsx';

import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { SignUpComponent } from './SignUp.types.ts';

const tariffPlans = [
  {
    id: 1,
    title: 'Ultimate',
    period: '12 months',
    pricePerMonth: '6',
    description: 'BILLED YEARLY IN ONE PAYMENT OF $72',
  },
  {
    id: 2,
    title: 'Favorable',
    period: '6 months',
    pricePerMonth: '8',
    description: 'BILLED IN ONE INSTALLMENT OF $48',
  },
  { id: 3, title: 'Basic', period: '1 month', pricePerMonth: '10', description: 'RECURRING MONTHLY AT $10' },
];

export const SignUp: SignUpComponent = () => {
  const [tariffChecked, setTariffChecked] = useState(tariffPlans[0].title);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleTariffChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTariffChecked(event.target.value);
  };

  const tariffPlansList = tariffPlans.map((tariffPlan) => {
    const { id, title, period, pricePerMonth, description } = tariffPlan;
    return (
      <TariffPlanListItem key={`tariff-plan-${id}`}>
        <TariffPlan
          type='radio'
          id={title}
          value={title}
          name='tariffs'
          checked={tariffChecked === title}
          onChange={handleTariffChange}
        />
        <TariffPlanLabel htmlFor={title}>
          <TariffPlanTitle>{title}</TariffPlanTitle>
          <TariffPlanPeriod>{period}</TariffPlanPeriod>
          <TariffPrice>
            $<span>{pricePerMonth}</span>
            per month
          </TariffPrice>
          <TariffPlanDescription>{description}</TariffPlanDescription>
        </TariffPlanLabel>
      </TariffPlanListItem>
    );
  });

  return (
    <Container>
      <PageHeading textContent='Sign Up' />
      <FormContainer>
        <Form onSubmit={handleFormSubmit}>
          <Block>
            <Title>Membership plan</Title>
            <TariffPlanList>{tariffPlansList}</TariffPlanList>
          </Block>

          <Block>
            <Title>Email</Title>
            <TextInputContainer>
              <TextInput type='email' placeholder='Your Email' />
            </TextInputContainer>
          </Block>

          <Block>
            <Title>Discount</Title>
            <TextInputContainer>
              <TextInput type='text' placeholder='Discount Code' />
            </TextInputContainer>
          </Block>

          <Block>
            <Submit type='submit' textContent='Sign Up' />
          </Block>
        </Form>
      </FormContainer>
    </Container>
  );
};

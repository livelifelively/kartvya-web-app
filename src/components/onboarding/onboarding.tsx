import React from 'react';
import { Box, Button, Group, Stepper } from '@mantine/core';
import { useMachine } from '@xstate/react';
import stepperMachine, { onboardingStepperStates } from './state/onboarding.state'; // Adjust the path as needed
// import { keyBy } from 'lodash';

export function Onboarding() {
  const [current, send] = useMachine(stepperMachine);

  // const onboardingStepperStatesKeyedByName = keyBy(onboardingStepperStates, 'name');

  const handleNext = () => {
    send({ type: 'E_NEXT' });
  };

  const handlePrevious = () => {
    send({ type: 'E_PREVIOUS' });
  };

  const stepperSteps = onboardingStepperStates.map((state: any) => {
    return (
      <Stepper.Step key={state.name} label={state.label} description={state.description}>
        <>
          <p>This is the {state.name} step</p>
        </>
      </Stepper.Step>
    );
  });

  return (
    <Box>
      <Stepper active={current.context.currentStepIndex} allowNextStepsSelect={false}>
        {stepperSteps}
      </Stepper>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={handlePrevious} disabled={!current.can({ type: 'E_PREVIOUS' })}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!current.can({ type: 'E_NEXT' })}>
          Next step
        </Button>
      </Group>
    </Box>
  );
}

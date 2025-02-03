import React from 'react';
import { Button, Group, Stepper } from '@mantine/core';
import { useMachine } from '@xstate/react';
import stepperMachine from './state/onboarding.state'; // Adjust the path as needed

export function Onboarding() {
  const [current, send] = useMachine(stepperMachine);

  const handleNext = () => {
    if (current.value !== 'done') {
      send({ type: 'E_NEXT' });
    }
  };

  const handlePrevious = () => {
    send({ type: 'E_PREVIOUS' });
  };

  const steps = Array.from({ length: current.context.steps }, (_, i) => (
    <Stepper.Step key={i + 1} label={`Step ${i + 1}`} description={`Description of step ${i + 1}`}>
      <>this is step {i + 1}</>
    </Stepper.Step>
  ));

  return (
    <div>
      <Stepper active={current.context.currentStep - 1} allowNextStepsSelect={false}>
        {steps}
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={handlePrevious}>
          Back
        </Button>
        <Button onClick={handleNext}>Next step</Button>
      </Group>
    </div>
  );
}

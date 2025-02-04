import { useState } from 'react';
import {
  Box,
  Button,
  Group,
  ScrollArea,
  Title,
  Stepper,
} from '@mantine/core';
import { OnboardingAppShell } from '../app-shell/onboarding-app-shell';
import { SelectSubjects } from './select-subjects';
import Logo from '../logo/logo';
import { SelectRegions } from './select-region';

export function Onboarding() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <OnboardingAppShell containerSize="xl">
      <Box h="100vh" style={{ boxSizing: 'border-box' }}>
        <Title ta="center" size="h5" mb={10} mt={10}>
          Welcome to <Logo size="h1" linksToHome={false} />
        </Title>
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          <Stepper.Step label="First step" description="Create an account">
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              Select Public Policy Subjects
            </Title>
            <ScrollArea h="70vh" scrollbars="y">
              <Box pr={20} pt={32}>
                <SelectSubjects />
              </Box>
            </ScrollArea>
            <Group justify="center" mt="sm">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            <Group justify="center" mt="sm">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
            <Box pr={20} pt={32}>
              <SelectRegions />
            </Box>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <Group justify="center" mt="sm">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next step</Button>
            </Group>
            <Box pr={20} pt={32}>
              <SelectSubjects />
            </Box>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Box>
    </OnboardingAppShell>
  );
}

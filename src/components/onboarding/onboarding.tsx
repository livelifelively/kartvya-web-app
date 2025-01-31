import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
  Stepper,
} from '@mantine/core';
import classes from './onboarding.module.css';
import { OnboardingAppShell } from '../app-shell/onboarding-app-shell';
import { NavbarNested } from '../app-shell/navbar-nested';
import { SelectSubjects } from './select-subjects';
import Logo from '../logo/logo';

// function OnboardingSteps() {
//   return (
//     <>

//     </>
//   );
// }

export function Onboarding() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <OnboardingAppShell
      containerSize="xl"
      // asideContent={<NavbarNested />}
      // navbarContent={<OnboardingSteps />}
    >
      <Title ta="center" size="h5" mb={10}>
        Welcome to <Logo size="h1" linksToHome={false} />
      </Title>
      {/* <ScrollArea h={'80vh'} scrollbars="y"> */}
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
        // orientation="vertical"
      >
        <Stepper.Step label="First step" description="Create an account">
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
        <Stepper.Step label="Second step" description="Verify email">
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
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      {/* </ScrollArea> */}
    </OnboardingAppShell>
  );
}

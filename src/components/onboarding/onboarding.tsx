import React from 'react';
import { Box, Button, Group, ScrollArea, Stepper, Title } from '@mantine/core';
import { useMachine } from '@xstate/react';
import stepperMachine, {
  onboardingStepperStates,
  S_SELECT_REGIONS,
  S_SELECT_SUBJECTS,
  SelectedRegion,
} from './state/onboarding.state';
import { SelectSubjects } from './select-subjects';
import { OnboardingAppShell } from '../app-shell/onboarding-app-shell';
import Logo from '../logo/logo';
import { SelectRegions } from './select-region';
import { AppErrorBoundary } from '@/components/common/error-boundary';

export function Onboarding() {
  const [current, send] = useMachine(stepperMachine);

  const handleNext = () => {
    send({ type: 'E_NEXT' });
  };

  const handlePrevious = () => {
    send({ type: 'E_PREVIOUS' });
  };

  const stepperSteps = onboardingStepperStates.map((state: any) => {
    return (
      <Stepper.Step key={state.name} label={state.label} description={state.subText}>
        {state.name === S_SELECT_SUBJECTS && (
          <>
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              {`Select ${current.context.selectSubjects.minimumSubjectsCount} or more Public Policy Subjects`}
            </Title>
            <ScrollArea h="70vh" scrollbars="y">
              <Box pr={20} pt={32}>
                <SelectSubjects
                  allSubjectsGroups={current.context.selectSubjects.allSubjectsGroups}
                  selectedSubjects={current.context.selectSubjects.selectedSubjects}
                  onSelectedSubjectsChanged={(selectedSubjects: string[]) => {
                    send({ type: 'E_SELECTED_SUBJECTS_CHANGED', selectedSubjects });
                  }}
                />
              </Box>
            </ScrollArea>
          </>
        )}
        {state.name === S_SELECT_REGIONS && (
          <>
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              Select your Region
            </Title>
            <SelectRegions
              allRegions={current.context.selectRegions.allRegions}
              selectedRegions={current.context.selectRegions.selectedRegions}
              onSelectedRegionsChanged={(selectedRegion: SelectedRegion) => {
                send({ type: 'E_SELECTED_REGIONS_CHANGED', selectedRegion });
              }}
            />
          </>
        )}
      </Stepper.Step>
    );
  });

  return (
    <AppErrorBoundary
      title="Onboarding Error"
      description="An error occurred during the onboarding process"
      actionLabel="Restart Onboarding"
    >
      <OnboardingAppShell containerSize="xl">
        <Box h="100vh" style={{ boxSizing: 'border-box' }}>
          <Title ta="center" size="h5" mb={10} mt={10}>
            Welcome to <Logo size="h1" linksToHome={false} />
          </Title>
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
      </OnboardingAppShell>
    </AppErrorBoundary>
  );
}

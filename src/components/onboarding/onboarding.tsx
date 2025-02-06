import React from 'react';
import { Box, Button, Group, ScrollArea, Stepper, Title, Text, List } from '@mantine/core';
import { useMachine } from '@xstate/react';
import stepperMachine, {
  S_SELECT_REGIONS,
  S_SELECT_SUBJECTS,
  S_CONFIRMATION,
  S_DONE,
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

  const getStepContext = (state: string) => {
    switch (state) {
      case S_SELECT_SUBJECTS:
        return current.context.selectSubjects;
      case S_SELECT_REGIONS:
        return current.context.selectRegions;
      case S_CONFIRMATION:
        return current.context.confirmation;
      case S_DONE:
        return current.context.done;
      default:
        return current.context.confirmation;
    }
  };

  const renderStep = (state: string) => {
    const stepContext = getStepContext(state);

    return (
      <Stepper.Step key={state} label={stepContext.label} description={stepContext.subText}>
        {state === S_SELECT_SUBJECTS && (
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
        {state === S_SELECT_REGIONS && (
          <>
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              {current.context.selectRegions.description}
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
        {state === S_CONFIRMATION && (
          <>
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              Confirm Your Selections
            </Title>
            <Box p={20}>
              <Box mb={32}>
                <Title order={4} mb={16}>
                  Selected Subjects
                </Title>
                <List>
                  {current.context.selectSubjects.selectedSubjects.map((subject: string) => (
                    <List.Item key={subject}>{subject.split('-').join(' ')}</List.Item>
                  ))}
                </List>
              </Box>
              <Box>
                <Title order={4} mb={16}>
                  Selected Region
                </Title>
                <List>
                  <List.Item>State: {current.context.selectRegions.selectedRegions.state?.name}</List.Item>
                  <List.Item>District: {current.context.selectRegions.selectedRegions.district?.name}</List.Item>
                  <List.Item>
                    Lok Sabha: {current.context.selectRegions.selectedRegions.loksabhaConstituency?.name}
                  </List.Item>
                  <List.Item>
                    Vidhan Sabha: {current.context.selectRegions.selectedRegions.vidhansabhaConstituency?.name}
                  </List.Item>
                </List>
              </Box>
              <Text c="dimmed" size="sm" mt={32} ta="center">
                Please review your selections. Click Next to complete the onboarding process.
              </Text>
            </Box>
          </>
        )}
        {state === S_DONE && (
          <>
            <Title ta="center" size="h2" c="brandYellow" mt={20} pb={20}>
              Thank You!
            </Title>
            <Box p={20}>
              <Text ta="center" size="lg" mb={16}>
                Your preferences have been saved successfully.
              </Text>
              <Text c="dimmed" size="sm" ta="center">
                Redirecting you to the dashboard in 3 seconds...
              </Text>
            </Box>
          </>
        )}
      </Stepper.Step>
    );
  };

  const steps = [S_SELECT_SUBJECTS, S_SELECT_REGIONS, S_CONFIRMATION, S_DONE].map(renderStep);

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
            {steps}
          </Stepper>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={handlePrevious} disabled={!current.can({ type: 'E_PREVIOUS' })}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!current.can({ type: 'E_NEXT' })}>
              {current.context.currentStepIndex === 2 ? 'Complete' : 'Next step'}
            </Button>
          </Group>
        </Box>
      </OnboardingAppShell>
    </AppErrorBoundary>
  );
}

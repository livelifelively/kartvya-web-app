import { size } from 'lodash';
import { assign, setup } from 'xstate';

interface OnboardingStepperContext {
  currentStepIndex: number;
  selectSubjects: {
    allSubjects: string[];
    selectedSubjects: string[];
    minimumSubjectsCount: number;
  };
}

const S_SELECT_SUBJECTS = 'S_SELECT_SUBJECTS';
const S_SELECT_REGION = 'S_SELECT_REGION';
const S_DONE = 'S_DONE';
const G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED = 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED';

type OnboardingStepperEvents = { type: 'E_NEXT' } | { type: 'E_PREVIOUS' };

export const onboardingStepperStates = [
  {
    index: 0,
    name: S_SELECT_SUBJECTS,
    label: 'Select Subjects',
    description: 'Choose your subjects',
    next: S_SELECT_REGION,
    next_guard: {
      name: G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED,
      function: ({ context }: any) => {
        const {
          selectSubjects: { selectedSubjects, minimumSubjectsCount },
        } = context;

        if (size(selectedSubjects) >= minimumSubjectsCount) {
          return true;
        }

        return false;
      },
    },
  },
  {
    index: 1,
    name: S_SELECT_REGION,
    previous: S_SELECT_SUBJECTS,
    next: S_DONE,
    label: 'Select Region',
    description: 'Choose your region',
  },
  { index: 2, name: S_DONE, label: 'Done', description: 'Done' },
];

const initialState = onboardingStepperStates[0].name;
const updateStepActionCall = (step: any) => {
  return {
    type: 'A_UPDATE_STEP_INDEX',
    params: () => {
      return { currentStepIndex: step.index };
    },
  };
};

const stepperMachineStates = onboardingStepperStates.reduce((agg: any, val: any, index: number) => {
  if (index === 0) {
    agg[val.name] = {
      entry: [updateStepActionCall(val)],
      on: {
        E_NEXT: {
          target: val.next,
          guard: val.next_guard.function,
        },
      },
    };
  } else if (index === onboardingStepperStates.length - 1) {
    agg[val.name] = {
      entry: [updateStepActionCall(val)],
      type: 'final',
    };
  } else {
    agg[val.name] = {
      entry: [updateStepActionCall(val)],
      on: {
        E_NEXT: {
          target: val.next,
          guard: val.next_guard?.function,
        },
        E_PREVIOUS: {
          target: val.previous,
        },
      },
    };
  }

  return agg;
}, {});

const stepperMachine = setup({
  types: {
    context: {} as OnboardingStepperContext,
    events: {} as OnboardingStepperEvents,
  },
  actions: {
    A_UPDATE_STEP_INDEX: assign((_, params: { currentStepIndex: number }) => {
      const { currentStepIndex } = params;
      return {
        currentStepIndex,
      };
    }),
  },
}).createMachine({
  id: 'stepper',
  initial: initialState,
  context: {
    currentStepIndex: 0,
    selectSubjects: {
      allSubjects: [],
      selectedSubjects: [],
      minimumSubjectsCount: 0,
    },
  },
  states: stepperMachineStates,
});

export default stepperMachine;

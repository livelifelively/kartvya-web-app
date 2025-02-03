import { assign, setup } from 'xstate';

interface StepperContext {
  currentStepIndex: number;
  selectSubjects: {
    allSubjects: string[];
    selectedSubjects: string[];
  };
}

type StepperEvents = { type: 'E_NEXT' } | { type: 'E_PREVIOUS' };

const statesMap = [
  {
    index: 0,
    name: 'S_SELECT_SUBJECTS',
    next: 'S_SELECT_REGION',
  },
  {
    index: 1,
    name: 'S_SELECT_REGION',
    previous: 'S_SELECT_SUBJECTS',
    next: 'S_DONE',
  },
  { index: 2, name: 'S_DONE' },
];

const initialState = statesMap[0].name;
const updateStepActionCall = (step: any) => {
  return {
    type: 'A_UPDATE_STEP_INDEX',
    params: () => {
      return { currentStepIndex: step.index };
    },
  };
};

// first step can move forward, middle steps can move either way.
// last step is final, it cannot move anywhere.
const stepperMachineStates = statesMap.reduce((agg: any, val: any, index: number) => {
  if (index === 0) {
    agg[val.name] = {
      entry: [updateStepActionCall(val)],
      on: {
        E_NEXT: {
          target: val.next,
        },
      },
    };
  } else if (index === statesMap.length - 1) {
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
    context: {} as StepperContext,
    events: {} as StepperEvents,
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
    currentStepIndex: 0, // initial index
    selectSubjects: {
      allSubjects: [],
      selectedSubjects: [],
    },
  },
  states: stepperMachineStates,
});

export default stepperMachine;

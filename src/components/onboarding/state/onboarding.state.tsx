import { setup } from 'xstate';

interface StepperContext {
  selectSubjects: {
    allSubjects: string[];
    selectedSubjects: string[];
  };
}

type StepperEvents = { type: 'E_NEXT' } | { type: 'E_PREVIOUS' };

const stepperMachine = setup({
  types: {
    context: {} as StepperContext,
    events: {} as StepperEvents,
  },

  actions: {},
}).createMachine({
  id: 'stepper',
  initial: 'S_SELECT_SUBJECTS',
  context: {
    selectSubjects: {
      allSubjects: [],
      selectedSubjects: [],
    },
  },
  states: {
    S_SELECT_SUBJECTS: {
      on: {
        E_NEXT: {
          target: 'S_SELECT_REGION',
        },
      },
    },
    S_SELECT_REGION: {
      on: {
        E_NEXT: {
          target: 'done',
        },
        E_PREVIOUS: {
          target: 'S_SELECT_SUBJECTS',
        },
      },
    },
    done: {
      type: 'final',
    },
  },
});

export default stepperMachine;

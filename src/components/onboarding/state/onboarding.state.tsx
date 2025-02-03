import { assign, setup } from 'xstate';

interface StepperContext {
  steps: number;
  currentStep: number;
}

type StepperEvents = { type: 'E_NEXT' } | { type: 'E_PREVIOUS' };

const stepperMachine = setup({
  types: {
    context: {} as StepperContext,
    events: {} as StepperEvents,
  },

  actions: {
    A_GO_TO_NEXT_STEP: assign(({ context }) => {
      return {
        currentStep: context.currentStep + 1,
      };
    }),

    A_GO_TO_PREVIOUS_STEP: assign(({ context }) => {
      return {
        currentStep: context.currentStep - 1,
      };
    }),
  },
}).createMachine({
  id: 'stepper',
  initial: 'step1',
  context: {
    steps: 5, // Hardcoding for now, will make dynamic later
    currentStep: 1, // keep track of the numeric value of current step
  },
  states: {
    step1: {
      on: {
        E_NEXT: {
          actions: [{ type: 'A_GO_TO_NEXT_STEP' }],
          target: 'step2',
        },
      },
    },
    step2: {
      on: {
        E_NEXT: {
          actions: [{ type: 'A_GO_TO_NEXT_STEP' }],
          target: 'step3',
        },
        E_PREVIOUS: {
          actions: [{ type: 'A_GO_TO_PREVIOUS_STEP' }],
          target: 'step1',
        },
      },
    },
    step3: {
      on: {
        E_NEXT: {
          actions: [{ type: 'A_GO_TO_NEXT_STEP' }],
          target: 'step4',
        },
        E_PREVIOUS: {
          actions: [{ type: 'A_GO_TO_PREVIOUS_STEP' }],
          target: 'step2',
        },
      },
    },
    step4: {
      on: {
        E_NEXT: {
          actions: [{ type: 'A_GO_TO_NEXT_STEP' }],
          target: 'step5',
        },
        E_PREVIOUS: {
          actions: [{ type: 'A_GO_TO_PREVIOUS_STEP' }],
          target: 'step3',
        },
      },
    },
    step5: {
      on: {
        E_NEXT: {
          actions: [{ type: 'A_GO_TO_NEXT_STEP' }],
          target: 'done',
        },
        E_PREVIOUS: {
          actions: [{ type: 'A_GO_TO_PREVIOUS_STEP' }],
          target: 'step4',
        },
      },
    },
    done: {
      type: 'final',
    },
  },
});

export default stepperMachine;

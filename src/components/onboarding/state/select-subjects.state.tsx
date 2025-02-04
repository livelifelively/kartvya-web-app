import { size } from 'lodash';
import { assign, not, setup } from 'xstate';

type SelectSubjectsEvents = { type: 'E_SELECTED_SUBJECTS_CHANGED'; selectedSubjects: string[] };

interface SelectSubjectsContext {
  allSubjects: string[];
  selectedSubjects: string[];
  minimumSubjectsCount: number;
}

export const selectSubjectsMachine = setup({
  types: {
    context: {} as SelectSubjectsContext,
    events: {} as SelectSubjectsEvents,
  },
  actions: {
    A_UPDATE_SELECTED_SUBJECTS: assign(({ event }) => {
      return {
        selectedSubjects: event.selectedSubjects,
      };
    }),
  },
  guards: {
    G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED: ({ context }) => {
      const { selectedSubjects, minimumSubjectsCount } = context;

      if (size(selectedSubjects) >= minimumSubjectsCount) {
        return true;
      }

      return false;
    },
  },
}).createMachine({
  id: `M_SELECT_SUBJECTS`,
  initial: 'S_DATA_ENTRY',
  context: {
    allSubjects: [],
    selectedSubjects: [],
    minimumSubjectsCount: 5,
  },
  type: 'parallel',
  states: {
    S_DATA_ENTRY: {
      on: {
        E_SELECTED_SUBJECTS_CHANGED: {
          actions: [
            {
              type: 'A_UPDATE_SELECTED_SUBJECTS',
              params: ({ event }) => {
                return { selectedSubjects: event.selectedSubjects };
              },
            },
          ],
        },
      },
    },
    S_VALIDATION: {
      initial: 'S_INVALID',
      states: {
        S_VALID: {
          on: {
            E_SELECTED_SUBJECTS_CHANGED: {
              target: 'S_INVALID',
              guard: 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED',
            },
          },
        },
        S_INVALID: {
          on: {
            E_SELECTED_SUBJECTS_CHANGED: {
              target: 'S_INVALID',
              guard: not('G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED'),
            },
          },
        },
      },
    },
  },
});

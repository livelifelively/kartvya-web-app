import { size } from 'lodash';
import { assign, setup } from 'xstate';
import { allSubjectsGroups, SubjectGroup } from './all-subjects-groups.data';
import { statesData } from './select-regions.data';

export interface SelectedRegion {
  state: string;
  district: string;
  loksabhaConstituency: string;
  vidhansabhaConstituency: string;
}

interface OnboardingStepperContext {
  currentStepIndex: number;
  selectSubjects: {
    allSubjectsGroups: SubjectGroup[];
    selectedSubjects: string[];
    minimumSubjectsCount: number;
  };
  selectRegions: {
    allRegions: any;
    selectedRegions: SelectedRegion;
    minimumRegionsCount: number;
  };
}

export const S_SELECT_SUBJECTS = 'S_SELECT_SUBJECTS';
export const S_SELECT_REGIONS = 'S_SELECT_REGIONS';
export const S_DONE = 'S_DONE';
export const G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED = 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED';
export const G_MINIMUM_NUMBER_OF_REGIONS_SELECTED = 'G_MINIMUM_NUMBER_OF_REGIONS_SELECTED';

type OnboardingStepperEvents =
  | { type: 'E_NEXT' }
  | { type: 'E_PREVIOUS' }
  | { type: 'E_SELECTED_SUBJECTS_CHANGED'; selectedSubjects: string[] }
  | { type: 'E_SELECTED_REGIONS_CHANGED'; selectedRegion: SelectedRegion };

export const onboardingStepperStates = [
  {
    index: 0,
    name: S_SELECT_SUBJECTS,
    label: 'Select Subjects',
    subText: '',
    description: 'Choose your subjects',
    next: S_SELECT_REGIONS,
    on: {
      E_SELECTED_SUBJECTS_CHANGED: {
        actions: assign(({ event, context }) => {
          return {
            selectSubjects: {
              ...context.selectSubjects,
              selectedSubjects: event.selectedSubjects,
            },
          };
        }),
      },
    },
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
    name: S_SELECT_REGIONS,
    previous: S_SELECT_SUBJECTS,
    next: S_DONE,
    label: 'Select Region',
    description: 'Choose your region',
    on: {
      E_SELECTED_REGIONS_CHANGED: {
        actions: assign(({ event, context }) => {
          return {
            selectRegions: {
              ...context.selectRegions,
              selectedRegions: event.selectedRegion,
            },
          };
        }),
      },
    },
    next_guard: {
      name: G_MINIMUM_NUMBER_OF_REGIONS_SELECTED,
      function: ({ context }: any) => {
        const {
          selectRegions: { selectedRegions, minimumRegionsCount },
        } = context;

        if (size(selectedRegions) >= minimumRegionsCount) {
          return true;
        }

        return false;
      },
    },
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
        ...val.on,
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
        ...val.on,
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
      allSubjectsGroups,
      selectedSubjects: [],
      minimumSubjectsCount: 5,
    },
    selectRegions: {
      allRegions: statesData,
      selectedRegions: {
        state: '',
        district: '',
        loksabhaConstituency: '',
        vidhansabhaConstituency: '',
      },
      minimumRegionsCount: 1,
    },
  },
  states: stepperMachineStates,
});

export default stepperMachine;

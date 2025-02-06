import { size } from 'lodash';
import { assign, setup } from 'xstate';
import { allSubjectsGroups, SubjectGroup } from './all-subjects-groups.data';
import { statesData } from './select-regions.data';

export interface SelectedRegion {
  state: Region | null;
  district: Region | null;
  loksabhaConstituency: Region | null;
  vidhansabhaConstituency: Region | null;
}

interface Region {
  name: string;
  name_id: string;
  region_name_id: string;
}

interface OnboardingStepperContext {
  currentStepIndex: number;
  selectSubjects: {
    label: string;
    subText?: string;
    description: string;
    allSubjectsGroups: SubjectGroup[];
    selectedSubjects: string[];
    minimumSubjectsCount: number;
  };
  selectRegions: {
    label: string;
    subText?: string;
    description: string;
    allRegions: any;
    selectedRegions: SelectedRegion;
    minimumRegionsCount: number;
    error?: string;
  };
  confirmation: {
    label: string;
    description: string;
    subText?: string;
  };
  done: {
    label: string;
    description: string;
    subText?: string;
  };
}

export const S_SELECT_SUBJECTS = 'S_SELECT_SUBJECTS';
export const S_SELECT_REGIONS = 'S_SELECT_REGIONS';
export const S_CONFIRMATION = 'S_CONFIRMATION';
export const S_DONE = 'S_DONE';
export const G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED = 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED';
export const G_MINIMUM_NUMBER_OF_REGIONS_SELECTED = 'G_MINIMUM_NUMBER_OF_REGIONS_SELECTED';

type OnboardingStepperEvents =
  | { type: 'E_NEXT' }
  | { type: 'E_PREVIOUS' }
  | { type: 'E_SELECTED_SUBJECTS_CHANGED'; selectedSubjects: string[] }
  | { type: 'E_SELECTED_REGIONS_CHANGED'; selectedRegion: SelectedRegion };

const stepperMachine = setup({
  types: {
    context: {} as OnboardingStepperContext,
    events: {} as OnboardingStepperEvents,
  },
  actions: {
    A_UPDATE_STEP_INDEX: assign((_, params: { currentStepIndex: number }) => ({
      currentStepIndex: params.currentStepIndex,
    })),
  },
  guards: {
    G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED: ({ context }) => {
      const {
        selectSubjects: { selectedSubjects, minimumSubjectsCount },
      } = context;
      return size(selectedSubjects) >= minimumSubjectsCount;
    },
    G_MINIMUM_NUMBER_OF_REGIONS_SELECTED: ({ context }): boolean => {
      const {
        selectRegions: { selectedRegions },
      } = context;
      return Boolean(
        selectedRegions.state &&
          selectedRegions.district &&
          selectedRegions.loksabhaConstituency &&
          selectedRegions.vidhansabhaConstituency
      );
    },
  },
}).createMachine({
  id: 'stepper',
  initial: S_SELECT_SUBJECTS,
  context: {
    currentStepIndex: 0,
    selectSubjects: {
      allSubjectsGroups,
      selectedSubjects: [],
      minimumSubjectsCount: 5,
      label: 'Select Subjects',
      subText: '',
      description: 'Choose your subjects',
    },
    selectRegions: {
      allRegions: statesData,
      selectedRegions: {
        state: null,
        district: null,
        loksabhaConstituency: null,
        vidhansabhaConstituency: null,
      },
      minimumRegionsCount: 1,
      label: 'Select Region',
      description: 'Choose your region',
      error: undefined,
    },
    confirmation: {
      label: 'Confirmation',
      description: 'Confirm your selections',
    },
    done: {
      label: 'Done',
      description: 'Thank you for your selections',
    },
  },
  states: {
    [S_SELECT_SUBJECTS]: {
      entry: assign({ currentStepIndex: 0 }),
      on: {
        E_NEXT: {
          target: S_SELECT_REGIONS,
          guard: 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED',
        },
        E_SELECTED_SUBJECTS_CHANGED: {
          actions: assign(({ event, context }) => ({
            selectSubjects: {
              ...context.selectSubjects,
              selectedSubjects: event.selectedSubjects,
            },
          })),
        },
      },
    },
    [S_SELECT_REGIONS]: {
      entry: assign({ currentStepIndex: 1 }),
      on: {
        E_NEXT: {
          target: S_CONFIRMATION,
          guard: 'G_MINIMUM_NUMBER_OF_REGIONS_SELECTED',
        },
        E_PREVIOUS: {
          target: S_SELECT_SUBJECTS,
        },
        E_SELECTED_REGIONS_CHANGED: {
          actions: assign(({ event, context }) => ({
            selectRegions: {
              ...context.selectRegions,
              selectedRegions: event.selectedRegion,
            },
          })),
        },
      },
    },
    [S_CONFIRMATION]: {
      entry: assign({ currentStepIndex: 2 }),
      on: {
        E_NEXT: {
          target: S_DONE,
        },
        E_PREVIOUS: {
          target: S_SELECT_REGIONS,
        },
      },
    },
    [S_DONE]: {
      entry: assign({ currentStepIndex: 3 }),
      type: 'final',
    },
  },
});

export default stepperMachine;

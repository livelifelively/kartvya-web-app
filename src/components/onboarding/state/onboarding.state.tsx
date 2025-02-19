import { size } from 'lodash';
import { assign, setup, fromPromise } from 'xstate';
import { allSubjectsGroups, SubjectGroup } from './all-subjects-groups.data';
import { adaptFromDgraph, transformData } from './select-regions.data';
import router from 'next/router';

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
  saved?: {
    subjects?: boolean;
    regions?: boolean;
  };
  error?: string;
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
export const S_SAVING = 'S_SAVING';
export const S_LOAD_DATA = 'S_LOAD_DATA';
export const G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED = 'G_MINIMUM_NUMBER_OF_SUBJECTS_SELECTED';
export const G_MINIMUM_NUMBER_OF_REGIONS_SELECTED = 'G_MINIMUM_NUMBER_OF_REGIONS_SELECTED';

type OnboardingStepperEvents =
  | { type: 'E_NEXT' }
  | { type: 'E_PREVIOUS' }
  | { type: 'E_SELECTED_SUBJECTS_CHANGED'; selectedSubjects: string[] }
  | { type: 'E_SELECTED_REGIONS_CHANGED'; selectedRegion: SelectedRegion }
  | { type: 'E_DATA_LOADED'; data: { subjects: SubjectGroup[]; regions: any } };

const stepperMachine = setup({
  types: {
    context: {} as OnboardingStepperContext,
    events: {} as OnboardingStepperEvents,
  },
  actors: {
    loadData: fromPromise(async () => {
      const response = await fetch('/api/citizen/region');
      let regions = await response.json();

      regions = adaptFromDgraph(regions);
      regions = transformData(regions);

      return regions;
    }),
    saveCitizenSelectedSubjects: fromPromise(async ({ input }: { input: { selectedSubjects: string[] } }) => {
      const response = await fetch('/api/citizen/subject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subjects: input.selectedSubjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to save subjects');
      }

      return await response.json();
    }),
    saveCitizenSelectedRegions: fromPromise(async ({ input }: { input: { selectedRegions: SelectedRegion } }) => {
      const response = await fetch('/api/citizen/region', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regions: input.selectedRegions }),
      });

      if (!response.ok) {
        throw new Error('Failed to save regions');
      }

      return await response.json();
    }),
  },
  actions: {
    A_UPDATE_STEP_INDEX: assign((_, params: { currentStepIndex: number }) => ({
      currentStepIndex: params.currentStepIndex,
    })),
    A_UPDATE_DATA: assign(({ context }, params: { data: { regions: any } }) => {
      return {
        selectRegions: {
          ...context.selectRegions,
          allRegions: params.data.regions,
        },
      };
    }),
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
    G_SAVING_COMPLETE: ({ context }) => {
      return !context?.saved?.subjects && !context?.saved?.regions;
    },
  },
}).createMachine({
  id: 'stepper',
  initial: S_LOAD_DATA,
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
      allRegions: {},
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
    [S_LOAD_DATA]: {
      invoke: {
        src: 'loadData',
        onDone: {
          target: S_SELECT_SUBJECTS,
          actions: assign(({ event, context }) => {
            return {
              selectRegions: {
                ...context.selectRegions,
                allRegions: event.output,
              },
            };
          }),
        },
        onError: {
          target: S_LOAD_DATA,
        },
      },
    },
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
          target: 'S_SAVING',
        },
        E_PREVIOUS: {
          target: S_SELECT_REGIONS,
        },
      },
    },
    [S_SAVING]: {
      entry: assign({ saved: { subjects: false, regions: false } }),
      invoke: [
        {
          src: 'saveCitizenSelectedSubjects',
          input: ({ context }) => ({
            selectedSubjects: context.selectSubjects.selectedSubjects,
          }),
          onError: {
            target: S_CONFIRMATION,
            actions: assign(({ context }) => {
              const { saved } = context;

              return {
                error: 'Failed to save subjects',
                saved: { ...saved, subjects: false },
              };
            }),
          },
          onDone: {
            target: S_DONE,
            guard: 'G_SAVING_COMPLETE',
            actions: assign(({ context }) => {
              const { saved } = context;

              return {
                saved: { ...saved, subjects: true },
              };
            }),
          },
        },
        {
          src: 'saveCitizenSelectedRegions',
          input: ({ context }) => ({
            selectedRegions: context.selectRegions.selectedRegions,
          }),
          onError: {
            target: S_CONFIRMATION,
            actions: assign({
              error: 'Failed to save regions',
              saved: { subjects: false, regions: true },
            }),
          },
          onDone: {
            target: S_DONE,
            guard: 'G_SAVING_COMPLETE',
            actions: assign(({ context }) => {
              const { saved } = context;

              return {
                saved: { ...saved, regions: true },
              };
            }),
          },
        },
      ],
    },
    [S_DONE]: {
      entry: assign({
        currentStepIndex: 3,
        saved: { subjects: false, regions: false },
        error: undefined,
      }),
      after: {
        3000: {
          actions: [
            () => {
              router.push('/citizen/know');
            },
          ],
        },
      },
    },
  },
});

export default stepperMachine;

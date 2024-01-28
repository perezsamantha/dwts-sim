import { StateCreator, create } from 'zustand';
import { initialCast, initialJudges } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import {
  randomElim,
  randomScores,
  randomizeCast,
  shuffleCast,
  sortedMusic,
} from '../lib/logic';

export interface Team {
  id: number;
  teamMembers: Dancer[];
  placement: number;
  dances: Dance[];
  styles: string[];
}

export interface Dancer {
  firstName: string;
  lastName: string;
  image: string;
  type: string;
  dataIndex: number;
}

export interface Song {
  title: string;
  artist: string;
  style: string;
  uri?: string;
}

export interface Dance {
  teamId: number; // change to array for team dances
  title: string;
  artist: string;
  style: string;
  scores: number[];
  uri?: string;
}

interface SetupSlice {
  numberWeeks: number;
  numberTeams: number;
  cast: Team[];
  judges: string[];
  updateNumberWeeks: (newWeeks: number) => void;
  updateNumberTeams: (newTeams: number) => void;
  updateJudges: (newJudges: string[]) => void;
  updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => void;
  randomizeCast: () => void;
}

interface SimSlice {
  currentWeek: number;
  currentDance: number;
  currentRunningOrder: number[];
  weeks: Dance[][];
  music: Record<string, Song[]>;
  eliminated: number[][];
  updateCurrentWeek: () => void;
  prepareWeek: () => void;
  prepareFinale: () => void;
  // eliminateTeam: (elimId: number) => void;
}

const createSetupStore: StateCreator<SetupSlice> = (set) => ({
  numberWeeks: 10,
  numberTeams: initialCast.length,
  cast: initialCast,
  judges: initialJudges,
  updateNumberTeams: (newTeams) =>
    set((state) => ({ ...state, numberTeams: newTeams })),
  updateNumberWeeks: (newWeeks) =>
    set((state) => ({ ...state, numberWeeks: newWeeks })),
  updateJudges: (newJudges: string[]) =>
    set((state) => ({ ...state, judges: newJudges })),
  updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => {
    set(
      produce((state) => {
        state.cast[teamId].teamMembers[dancerId] = newDancer;
      })
    );
  },
  randomizeCast: () =>
    set((state) => ({ ...state, cast: randomizeCast(state.numberTeams) })),
});

const createSimStore: StateCreator<SimSlice & SetupSlice, [], [], SimSlice> = (
  set
) => ({
  currentWeek: 0,
  currentDance: 0,
  currentRunningOrder: [],
  weeks: [],
  music: sortedMusic,
  eliminated: [],
  updateCurrentWeek: () =>
    set((state) => ({ currentWeek: state.currentWeek + 1 })),
  prepareWeek: () =>
    set(
      produce((state) => {
        const runningOrder = shuffleCast(state.cast);
        state.weeks.push(new Array<Dance>());
        runningOrder.map((teamId) => {
          const dance: Dance =
            state.music[state.cast[teamId].styles[state.currentDance]][0];
          dance['scores'] = randomScores();
          state.cast[teamId].dances.push(dance);
          dance['teamId'] = teamId;
          state.weeks[state.currentWeek].push(dance);
          state.music[state.cast[teamId].styles[state.currentDance]].shift();
        });
        state.currentDance++;
        // double dances
        // if (runningOrder.length == 8) { // team dance
        // }

        if (runningOrder.length < 8) {
          // second round
          runningOrder.map((teamId) => {
            const dance: Dance =
              state.music[state.cast[teamId].styles[state.currentDance]][0];
            dance['scores'] = randomScores();
            state.cast[teamId].dances.push(dance);
            dance['teamId'] = teamId;
            state.weeks[state.currentWeek].push(dance);
            state.music[state.cast[teamId].styles[state.currentDance]].shift();
          });
          state.currentDance++;
        }
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;

        // eliminate team
        const elimId = randomElim(state.currentRunningOrder);
        state.cast[elimId].placement = state.currentRunningOrder.length;
        state.eliminated.push([elimId]);
      })
    ),
  prepareFinale: () =>
    set(
      produce((state) => {
        const runningOrder = shuffleCast(state.cast);
        state.weeks.push(new Array<Dance>());
        // redemption round
        runningOrder.map((teamId) => {
          const randomStyleIndex = Math.floor(
            Math.random() * state.currentDance
          );
          const redemptionDance: Dance =
            state.music[state.cast[teamId].styles[randomStyleIndex]][0];
          redemptionDance['scores'] = randomScores();
          state.cast[teamId].dances.push(redemptionDance);
          redemptionDance['teamId'] = teamId;
          state.weeks[state.currentWeek].push(redemptionDance);
          state.music[state.cast[teamId].styles[randomStyleIndex]].shift();
        });
        state.currentDance++;
        // freestyle round
        runningOrder.map((teamId) => {
          const freestyleDance: Dance = state.music['Freestyle'][0];
          freestyleDance['scores'] = randomScores();
          state.cast[teamId].dances.push(freestyleDance);
          freestyleDance['teamId'] = teamId;
          state.weeks[state.currentWeek].push(freestyleDance);
          state.music['Freestyle'].shift();
        });
        state.currentDance++;
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;
      })
    ),
  // eliminateTeam: (elimId: number) =>
  //   set(
  //     produce((state) => {
  //       state.cast[elimId].placement = state.currentRunningOrder.length;
  //     })
  //   ),
});

export const useBoundStore = create<SetupSlice & SimSlice>()(
  persist(
    (...a) => ({
      ...createSetupStore(...a),
      ...createSimStore(...a),
    }),
    {
      name: 'current',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

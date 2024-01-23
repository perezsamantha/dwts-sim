import { create } from 'zustand';
import { initialCast } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import {
  calculatePlacement,
  randomScores,
  shuffleCast,
  sortedMusic,
} from '../lib/logic';

interface Sim {
  numberWeeks: number;
  currentWeek: number;
  currentDance: number;
  currentRunningOrder: number[];
  cast: Team[];
  judges: string[];
  music: Record<string, { title: string; artist: string; style: string }[]>;
  weeks?: Team[];
  updateWeeks: (newWeeks: number) => void;
  updateTeam?: (id: number, newTeam: Team) => void;
  updateDancer?: (teamId: number, dancerId: number, newDancer: Dancer) => void;
  updateJudges?: (newJudges: string[]) => void;
  prepareDances: () => void;
  eliminateTeam: (teamId: number) => void;
}

export interface Team {
  id: number;
  teamMembers: Dancer[];
  placement: number;
  dances: Song[];
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
  scores: number[];
}

export interface Dance {
  teamId: number[];
  song: Song;
  scores: number[];
}

export const useSimStore = create<Sim>()(
  persist(
    (set) => ({
      numberWeeks: 10,
      currentWeek: 0,
      currentDance: 0,
      currentRunningOrder: [],
      cast: initialCast,
      judges: ['Carrie Ann Inaba', 'Derek Hough', 'Bruno Tonioli'],
      music: sortedMusic,
      weeks: new Array<Team>(),
      updateWeeks: (newWeeks) =>
        set((state) => ({ ...state, numberWeeks: newWeeks })),
      updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => {
        set(
          produce((state) => {
            state.cast[teamId].teamMembers[dancerId] = newDancer;
          })
        );
      },
      prepareDances: () =>
        set(
          produce((state) => {
            const runningOrder = shuffleCast(state.cast);
            state.currentWeek++;
            runningOrder.map((teamId) => {
              state.cast[teamId].dances.push(
                state.music[state.cast[teamId].styles[state.currentDance]][0]
              );
              state.cast[teamId].dances[state.cast[teamId].dances.length - 1][
                'scores'
              ] = randomScores();
              state.music[
                state.cast[teamId].styles[state.currentDance]
              ].shift();
            });
            state.currentRunningOrder = runningOrder;
            state.currentDance++;
          })
        ),
      updateJudges: (newJudges: string[]) =>
        set((state) => ({
          judges: newJudges,
        })),
      eliminateTeam: (teamIndex: number) =>
        set(
          produce((state) => {
            state.cast[teamIndex].placement = state.currentRunningOrder.length;
          })
        ),
    }),
    {
      name: 'current',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

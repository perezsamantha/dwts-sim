import { StateCreator, create } from 'zustand';
import { initialCast, initialJudges } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { randomScores, shuffleCast, sortedMusic } from '../lib/logic';

// interface Sim {
//   numberWeeks: number;
//   currentWeek: number;
//   currentDance: number;
//   currentRunningOrder: number[];
//   cast: Team[];
//   judges: string[];
//   music: Record<string, { title: string; artist: string; style: string }[]>;
//   weeks?: Team[];
//   updateWeeks: (newWeeks: number) => void;
//   updateTeam?: (id: number, newTeam: Team) => void;
//   updateDancer?: (teamId: number, dancerId: number, newDancer: Dancer) => void;
//   updateJudges?: (newJudges: string[]) => void;
//   prepareDances: () => void;
//   eliminateTeam: (teamId: number) => void;
// }

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
}

// export const useSimStore = create<Sim>()(
//   persist(
//     (set) => ({
//       numberWeeks: 10,
//       currentWeek: 0,
//       currentDance: 0,
//       currentRunningOrder: [],
//       cast: initialCast,
//       judges: ['Carrie Ann Inaba', 'Derek Hough', 'Bruno Tonioli'],
//       music: sortedMusic,
//       weeks: new Array<Team>(),
//       updateWeeks: (newWeeks) =>
//         set((state) => ({ ...state, numberWeeks: newWeeks })),
//       updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => {
//         set(
//           produce((state) => {
//             state.cast[teamId].teamMembers[dancerId] = newDancer;
//           })
//         );
//       },
//       prepareDances: () =>
//         set(
//           produce((state) => {
//             const runningOrder = shuffleCast(state.cast);
//             state.currentWeek++;
//             runningOrder.map((teamId) => {
//               state.cast[teamId].dances.push(
//                 state.music[state.cast[teamId].styles[state.currentDance]][0]
//               );
//               state.cast[teamId].dances[state.cast[teamId].dances.length - 1][
//                 'scores'
//               ] = randomScores();
//               state.music[
//                 state.cast[teamId].styles[state.currentDance]
//               ].shift();
//             });
//             state.currentRunningOrder = runningOrder;
//             state.currentDance++;
//           })
//         ),
//       updateJudges: (newJudges: string[]) =>
//         set((state) => ({
//           judges: newJudges,
//         })),
//       eliminateTeam: (teamIndex: number) =>
//         set(
//           produce((state) => {
//             state.cast[teamIndex].placement = state.currentRunningOrder.length;
//           })
//         ),
//     }),
//     {
//       name: 'current',
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );

interface SetupSlice {
  numberWeeks: number;
  numberTeams: number;
  cast: Team[];
  judges: string[];
  updateNumberWeeks: (newWeeks: number) => void;
  updateNumberTeams: (newTeams: number) => void;
  updateJudges: (newJudges: string[]) => void;
  updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => void;
}

interface SimSlice {
  currentWeek: number;
  currentDance: number;
  currentRunningOrder: number[];
  weeks: Dance[][];
  music: Record<string, Song[]>;
  updateCurrentWeek: () => void;
  prepareWeek: () => void;
  eliminateTeam: (elimId: number) => void;
}

export interface Dance {
  teamId: number; // change to array for team dances
  title: string;
  artist: string;
  style: string;
  scores: number[];
}

const createSetupStore: StateCreator<SetupSlice> = (set) => ({
  numberWeeks: 10,
  numberTeams: 12,
  cast: initialCast,
  judges: initialJudges,
  updateNumberTeams: (newTeams) =>
    set((state) => ({ ...state, numberTeams: newTeams })),
  updateNumberWeeks: (newWeeks) =>
    set((state) => ({ ...state, numberWeeks: newWeeks })),
  updateJudges: (newJudges: string[]) =>
    set((state) => ({
      judges: newJudges,
    })),
  updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => {
    set(
      produce((state) => {
        state.cast[teamId].teamMembers[dancerId] = newDancer;
      })
    );
  },
});

const createSimStore: StateCreator<SimSlice & SetupSlice, [], [], SimSlice> = (
  set
) => ({
  currentWeek: 0,
  currentDance: 0,
  currentRunningOrder: [],
  weeks: [],
  music: sortedMusic,
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
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;
      })
    ),
  eliminateTeam: (elimId: number) =>
    set(
      produce((state) => {
        state.cast[elimId].placement = state.currentRunningOrder.length;
      })
    ),
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

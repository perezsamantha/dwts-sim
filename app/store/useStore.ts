import { StateCreator, create } from 'zustand';
import { initialCast, initialJudges, initialSim } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Team, Dancer, Dance, Song } from './interfaces';
import { produce } from 'immer';
import {
  buildCast,
  calculateScores,
  determineFinalePlacements,
  eliminate,
  randomizeCast,
  randomizeTeam,
  shuffleCast,
  sortMusic,
  teamIdShuffle,
} from '../lib/logic';

interface SetupSlice {
  numberWeeks: number;
  numberTeams: number;
  cast: Team[];
  judges: string[];
  updateNumberWeeks: (newWeeks: number) => void;
  updateNumberTeams: (newTeams: number) => void;
  updateJudges: (newJudges: string[]) => void;
  updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => void;
  updateCastSize: () => void;
  randomizeCast: () => void;
}

interface SimSlice {
  currentWeek: number;
  currentDance: number;
  currentRunningOrder: number[];
  weeks: Dance[][];
  music: Record<string, Song[]>;
  eliminated: number[][];
  prepareWeek: () => void;
  prepareFinale: () => void;
  resetSim: () => void;
}

interface SaveSlice {
  saveCast: (name: string) => void;
  loadCast: (name: string) => void;
  removeCast: (name: string) => void;
}

const createSaveStore: StateCreator<
  SaveSlice & SetupSlice,
  [],
  [],
  SaveSlice
> = (set, get) => ({
  saveCast: (name: string) =>
    localStorage.setItem(
      name,
      JSON.stringify(
        get().cast.map(function (obj) {
          return obj.teamMembers;
        })
      )
    ),
  loadCast: (name: string) =>
    set((state) => ({
      ...state,
      cast:
        localStorage.getItem(name) !== null
          ? buildCast(JSON.parse(localStorage.getItem(name)!))
          : state.cast,
      numberTeams:
        localStorage.getItem(name) !== null
          ? JSON.parse(localStorage.getItem(name)!).length
          : state.numberTeams,
    })),
  removeCast: (name: string) => localStorage.removeItem(name),
});

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
  updateCastSize: () =>
    set(
      produce((state) => {
        if (state.cast.length < state.numberTeams) {
          const val = state.numberTeams - state.cast.length;
          for (let i = 0; i < val; i++) state.cast.push(randomizeTeam());
        } else if (state.cast.length > state.numberTeams) {
          const val = state.cast.length - state.numberTeams;
          for (let i = 0; i < val; i++) state.cast.pop();
        }
      })
    ),
  randomizeCast: () =>
    set((state) => ({ ...state, cast: randomizeCast(state.numberTeams) })),
});

const createSimStore: StateCreator<SimSlice & SetupSlice, [], [], SimSlice> = (
  set
) => ({
  ...initialSim,
  prepareWeek: () =>
    set(
      produce((state) => {
        const runningOrder = shuffleCast(state.cast);
        state.weeks.push(new Array<Dance>());
        runningOrder.map((teamId) => {
          const dance: Dance =
            state.music[state.cast[teamId].styles[state.currentDance]][0];
          dance['scores'] = calculateScores(
            state.currentWeek,
            state.numberWeeks
          );
          state.cast[teamId].dances.push(dance);
          dance['teamId'] = teamId;
          dance['week'] = state.currentWeek + 1;
          state.weeks[state.currentWeek].push(dance);
          state.music[state.cast[teamId].styles[state.currentDance]].shift();
        });
        state.currentDance++;
        // double dances
        if (runningOrder.length == 8) {
          // team dance
          const shuffled = teamIdShuffle(runningOrder);
          const team1 = shuffled.slice(0, shuffled.length / 2);
          const team2 = shuffled.slice(shuffled.length / 2, shuffled.length);
          const dance1 = state.music['Team Dance'][0];
          dance1['scores'] = calculateScores(
            state.currentWeek,
            state.numberWeeks
          );
          dance1['week'] = state.currentWeek + 1;
          dance1['teamIds'] = [];
          for (let i = 0; i < team1.length; i++) {
            state.cast[team1[i]].dances.push(dance1);
            dance1.teamIds.push(team1[i]);
          }
          state.weeks[state.currentWeek].push(dance1);
          state.music['Team Dance'].shift();

          const dance2 = state.music['Team Dance'][0];
          dance2['scores'] = calculateScores(
            state.currentWeek,
            state.numberWeeks
          );
          dance2['week'] = state.currentWeek + 1;
          dance2['teamIds'] = [];
          for (let i = 0; i < team2.length; i++) {
            state.cast[team2[i]].dances.push(dance2);
            dance2.teamIds.push(team2[i]);
          }
          state.weeks[state.currentWeek].push(dance2);
          state.music['Team Dance'].shift();
        }

        if (runningOrder.length < 8) {
          // second round
          runningOrder.map((teamId) => {
            const dance: Dance =
              state.music[state.cast[teamId].styles[state.currentDance]][0];
            dance['scores'] = calculateScores(
              state.currentWeek,
              state.numberWeeks
            );
            state.cast[teamId].dances.push(dance);
            dance['teamId'] = teamId;
            dance['week'] = state.currentWeek + 1;
            state.weeks[state.currentWeek].push(dance);
            state.music[state.cast[teamId].styles[state.currentDance]].shift();
          });
          state.currentDance++;
        }
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;

        // eliminate team
        const elimIds = eliminate(
          state.currentRunningOrder,
          state.cast,
          state.numberWeeks,
          state.currentWeek
        );
        if (elimIds) {
          for (let i = 0; i < elimIds.length; i++)
            state.cast[elimIds[i]].placement = state.currentRunningOrder.length;
        }
        state.eliminated.push(elimIds);
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
          redemptionDance['scores'] = calculateScores(
            state.currentWeek,
            state.numberWeeks
          );
          state.cast[teamId].dances.push(redemptionDance);
          redemptionDance['teamId'] = teamId;
          redemptionDance['week'] = state.currentWeek + 1;
          state.weeks[state.currentWeek].push(redemptionDance);
          state.music[state.cast[teamId].styles[randomStyleIndex]].shift();
        });

        // freestyle round
        runningOrder.map((teamId) => {
          const freestyleDance: Dance = state.music['Freestyle'][0];
          freestyleDance['scores'] = calculateScores(
            state.currentWeek,
            state.numberWeeks
          );
          state.cast[teamId].dances.push(freestyleDance);
          freestyleDance['teamId'] = teamId;
          freestyleDance['week'] = state.currentWeek + 1;
          state.weeks[state.currentWeek].push(freestyleDance);
          state.music['Freestyle'].shift();
        });
        state.currentDance++;
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;

        // finale placements
        const finalePlacements = determineFinalePlacements(
          [...state.cast],
          [...runningOrder]
        );
        for (let i = 0; i < finalePlacements.length; i++)
          state.cast[finalePlacements[i]].placement =
            finalePlacements.length - i;
        state.eliminated.push(finalePlacements);
      })
    ),
  resetSim: () =>
    set((state) => ({
      ...state,
      ...initialSim,
      music: sortMusic(),
    })),
});

export const useBoundStore = create<SetupSlice & SimSlice & SaveSlice>()(
  persist(
    (...a) => ({
      ...createSetupStore(...a),
      ...createSimStore(...a),
      ...createSaveStore(...a),
    }),
    {
      name: 'current',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

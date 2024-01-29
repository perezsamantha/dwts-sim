import { StateCreator, create } from 'zustand';
import { initialCast, initialJudges, initialSim } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Team, Dancer, Dance, Song } from './interfaces';
import { produce } from 'immer';
import {
  eliminate,
  randomScores,
  randomizeCast,
  randomizeTeam,
  shuffleCast,
  sortMusic,
  teamDanceShuffle,
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
        if (state.cast.length < state.numberTeams)
          state.cast.push(randomizeTeam());
        else if (state.cast.length > state.numberTeams) state.cast.pop();
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
          dance['scores'] = randomScores();
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
          const shuffled = teamDanceShuffle(runningOrder);
          const team1 = shuffled.slice(0, shuffled.length / 2);
          const team2 = shuffled.slice(shuffled.length / 2, shuffled.length);
          const dance1 = state.music['Team Dance'][0];
          dance1['scores'] = randomScores();
          dance1['week'] = state.currentWeek + 1;
          dance1['teamIds'] = [];
          for (let i = 0; i < team1.length; i++) {
            state.cast[team1[i]].dances.push(dance1);
            dance1.teamIds.push(team1[i]);
          }
          state.weeks[state.currentWeek].push(dance1);
          state.music['Team Dance'].shift();

          const dance2 = state.music['Team Dance'][0];
          dance2['scores'] = randomScores();
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
            dance['scores'] = randomScores();
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
          redemptionDance['scores'] = randomScores();
          state.cast[teamId].dances.push(redemptionDance);
          redemptionDance['teamId'] = teamId;
          redemptionDance['week'] = state.currentWeek + 1;
          state.weeks[state.currentWeek].push(redemptionDance);
          state.music[state.cast[teamId].styles[randomStyleIndex]].shift();
        });

        // freestyle round
        runningOrder.map((teamId) => {
          const freestyleDance: Dance = state.music['Freestyle'][0];
          freestyleDance['scores'] = randomScores();
          state.cast[teamId].dances.push(freestyleDance);
          freestyleDance['teamId'] = teamId;
          freestyleDance['week'] = state.currentWeek + 1;
          state.weeks[state.currentWeek].push(freestyleDance);
          state.music['Freestyle'].shift();
        });
        state.currentDance++;
        state.currentRunningOrder = runningOrder;
        state.currentWeek++;
      })
    ),
  resetSim: () =>
    set((state) => ({
      ...state,
      ...initialSim,
      music: sortMusic(),
    })),
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

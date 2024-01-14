import { create } from 'zustand';
import { initialCast } from './initialState';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { sortedMusic } from '../lib/logic';

interface Sim {
  weeks: number;
  currentWeek: number;
  currentDance: number;
  cast: Team[];
  judges: string[];
  music: Record<string, { Title: string; Artist: string; Style: string }[]>;
  updateWeeks: (newWeeks: number) => void;
  updateTeam?: (id: number, newTeam: Team) => void;
  updateDancer?: (teamId: number, dancerId: number, newDancer: Dancer) => void;
}

export interface Team {
  id: number;
  teamMembers: Dancer[];
  placement: number;
  //music?: [];
  styles: string[];
  updateDancer?: (id: number, newDancer: Dancer) => void;
}

export interface Dancer {
  firstName: string;
  lastName: string;
  image: string;
  type: string;
  dataIndex: number;
}

// interface Song {
//   Title: string;
//   Artist: string;
//   Style: string;
// }

export const useSimStore = create<Sim>()(
  persist(
    (set) => ({
      weeks: 10,
      currentWeek: 0,
      currentDance: 0,
      cast: initialCast,
      judges: ['Carrie Ann Inaba', 'Derek Hough', 'Bruno Tonioli'],
      music: sortedMusic,
      updateWeeks: (newWeeks) =>
        set((state) => ({ ...state, weeks: newWeeks })),

      // updateTeam: (teamId: number, newTeam: Team) => {
      //   set((state) => ({
      //     cast: state.cast.map((team) => (team.id === teamId ? newTeam : team)),
      //   }));
      // },
      updateDancer: (teamId: number, dancerId: number, newDancer: Dancer) => {
        set(
          produce((state) => {
            state.cast[teamId].teamMembers[dancerId] = newDancer;
          })
        );
      },
    }),
    {
      name: 'temp',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

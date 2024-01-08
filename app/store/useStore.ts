import { create } from 'zustand';
import { initialCast } from './initialState';

interface Sim {
  weeks: number;
  cast: Team[];
  updateTeam?: (id: number, newTeam: Team) => void;
  updateWeeks: (newWeeks: number) => void;
}

export interface Team {
  id: number;
  teamMembers: Person[];
  placement: number;
  updateTeamMember?: (id: number, newPerson: Person) => void;
}

interface Person {
  firstName: string;
  lastName: string;
  image: string;
}

export const usePersonStore = create<Person>((set) => ({
  firstName: '',
  lastName: '',
  image: '',
  updateFirstName: (newFirstName: string) =>
    set((state) => ({ ...state, firstName: newFirstName })),
  updateLastName: (newLastName: string) =>
    set((state) => ({ ...state, lastName: newLastName })),
  updateImage: (newImage: string) =>
    set((state) => ({ ...state, image: newImage })),
  updateAll: (newFirstName: string, newLastName: string, newImage: string) =>
    set({
      firstName: newFirstName,
      lastName: newLastName,
      image: newImage,
    }),
}));

export const useTeamStore = create<Team>((set, get) => ({
  id: 0,
  teamMembers: [],
  placement: 0,
  updateTeamMember: (id, newPerson) => {
    //console.log(newPerson);
    set((state) => ({
      ...state,
      team: state.teamMembers.map((person, i) =>
        id === i ? newPerson : person
      ),
    }));
    //console.log(get().teamMembers[0]);
  },
}));

export const useSimStore = create<Sim>((set, get) => ({
  weeks: 10,
  //cast: [],
  cast: initialCast,
  updateWeeks: (newWeeks) => set((state) => ({ ...state, weeks: newWeeks })),

  updateTeam: (teamId: number, newTeam: Team) => {
    //console.log(teamId + '  ' + newTeam.id);
    set((state) => ({
      cast: state.cast.map((team) => (team.id === teamId ? newTeam : team)),
    }));
    //console.log(get());
  },
}));

// const useBoundStore = create<PersonSlice & TeamSlice & SimSlice>()((... a) => ({
//   ...createPersonSlice(...a),
//   ...createTeamSlice(...a),
//   ...createSimSlice(...a)
// }));

import { shuffleStyles, sortMusic } from '../lib/logic';

export const initialJudges = [
  'Carrie Ann Inaba',
  'Derek Hough',
  'Bruno Tonioli',
];

export const initialSim = {
  currentWeek: 0,
  currentDance: 0,
  currentRunningOrder: [],
  weeks: [],
  //music: sortMusic(),
  //music: {},
  eliminated: [],
};

export const initialCast = [
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Joey',
        lastname: 'Graziadei',
        image: '/images/33/joey.jpg',
        type: 'celeb',
        dataId: '33_joey',
      },
      {
        firstname: 'Jenna',
        lastname: 'Johnson',
        image: '/images/pros/jenna.jpg',
        type: 'pro',
        dataId: 'jenna',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Ilona',
        lastname: 'Maher',
        image: '/images/33/ilona.jpg',
        type: 'celeb',
        dataId: '33_ilona',
      },
      {
        firstname: 'Alan',
        lastname: 'Bersten',
        image: '/images/pros/alan.jpg',
        type: 'pro',
        dataId: 'alan',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Chandler',
        lastname: 'Kinney',
        image: '/images/33/chandler.jpg',
        type: 'celeb',
        dataId: '33_chandler',
      },
      {
        firstname: 'Brandon',
        lastname: 'Armstrong',
        image: '/images/pros/brandon.jpg',
        type: 'pro',
        dataId: 'brandon',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Stephen',
        lastname: 'Nedoroscik',
        image: '/images/33/stephen.jpg',
        type: 'celeb',
        dataId: '33_stephen',
      },
      {
        firstname: 'Rylee',
        lastname: 'Arnold',
        image: '/images/pros/rylee.jpg',
        type: 'pro',
        dataId: 'rylee',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Danny',
        lastname: 'Amendola',
        image: '/images/33/danny.jpg',
        type: 'celeb',
        dataId: '33_danny',
      },
      {
        firstname: 'Witney',
        lastname: 'Carson',
        image: '/images/pros/witney.jpg',
        type: 'pro',
        dataId: 'witney',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Dwight',
        lastname: 'Howard',
        image: '/images/33/dwight.jpg',
        type: 'celeb',
        dataId: '33_dwight',
      },
      {
        firstname: 'Daniella',
        lastname: 'Karagach',
        image: '/images/pros/daniella.jpg',
        type: 'pro',
        dataId: 'daniella',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Jenn',
        lastname: 'Tran',
        image: '/images/33/jenn.jpg',
        type: 'celeb',
        dataId: '33_jenn',
      },
      {
        firstname: 'Sasha',
        lastname: 'Farber',
        image: '/images/pros/sasha.jpg',
        type: 'pro',
        dataId: 'sasha',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Phaedra',
        lastname: 'Parks',
        image: '/images/33/phaedra.jpg',
        type: 'celeb',
        dataId: '33_phaedra',
      },
      {
        firstname: 'Val',
        lastname: 'Chmerkovskiy',
        image: '/images/pros/val.jpg',
        type: 'pro',
        dataId: 'val',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Brooks',
        lastname: 'Nader',
        image: '/images/33/brooks.jpg',
        type: 'celeb',
        dataId: '33_brooks',
      },
      {
        firstname: 'Gleb',
        lastname: 'Savchenko',
        image: '/images/pros/gleb.jpg',
        type: 'pro',
        dataId: 'gleb',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Reginald',
        lastname: 'VelJohnson',
        image: '/images/33/reginald.jpg',
        type: 'celeb',
        dataId: '33_reginald',
      },
      {
        firstname: 'Emma',
        lastname: 'Slater',
        image: '/images/pros/emma.jpg',
        type: 'pro',
        dataId: 'emma',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Eric',
        lastname: 'Roberts',
        image: '/images/33/eric.jpg',
        type: 'celeb',
        dataId: '33_eric',
      },
      {
        firstname: 'Britt',
        lastname: 'Stewart',
        image: '/images/pros/britt.jpg',
        type: 'pro',
        dataId: 'britt',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Tori',
        lastname: 'Spelling',
        image: '/images/33/tori.jpg',
        type: 'celeb',
        dataId: '33_tori',
      },
      {
        firstname: 'Pasha',
        lastname: 'Pashkov',
        image: '/images/pros/pasha.jpg',
        type: 'pro',
        dataId: 'pasha',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Anna',
        lastname: 'Delvey',
        image: '/images/33/anna.jpg',
        type: 'celeb',
        dataId: '33_anna',
      },
      {
        firstname: 'Ezra',
        lastname: 'Sosa',
        image: '/images/pros/ezra.jpg',
        type: 'pro',
        dataId: 'ezra',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
];

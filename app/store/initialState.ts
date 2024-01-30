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
  music: sortMusic(),
  eliminated: [],
};

export const initialCast = [
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Xochitl',
        lastName: 'Gomez',
        image: '/images/32/xochitl.jpg',
        type: 'celeb',
        dataIndex: 0,
      },
      {
        firstName: 'Val',
        lastName: 'Chmerkovskiy',
        image: '/images/pros/val.jpg',
        type: 'pro',
        dataIndex: 14,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Jason',
        lastName: 'Mraz',
        image: '/images/32/jason.jpg',
        type: 'celeb',
        dataIndex: 1,
      },
      {
        firstName: 'Daniella',
        lastName: 'Karagach',
        image: '/images/pros/daniella.jpg',
        type: 'pro',
        dataIndex: 4,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Ariana',
        lastName: 'Madix',
        image: '/images/32/ariana.jpg',
        type: 'celeb',
        dataIndex: 2,
      },
      {
        firstName: 'Pasha',
        lastName: 'Pashkov',
        image: '/images/pros/pasha.jpg',
        type: 'pro',
        dataIndex: 10,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Charity',
        lastName: 'Lawson',
        image: '/images/32/charity.jpg',
        type: 'celeb',
        dataIndex: 3,
      },
      {
        firstName: 'Artem',
        lastName: 'Chigvintsev',
        image: '/images/pros/artem.jpg',
        type: 'pro',
        dataIndex: 1,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Alyson',
        lastName: 'Hannigan',
        image: '/images/32/alyson.jpg',
        type: 'celeb',
        dataIndex: 4,
      },
      {
        firstName: 'Sasha',
        lastName: 'Farber',
        image: '/images/pros/sasha.jpg',
        type: 'pro',
        dataIndex: 13,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Harry',
        lastName: 'Jowsey',
        image: '/images/32/harry.jpg',
        type: 'celeb',
        dataIndex: 5,
      },
      {
        firstName: 'Rylee',
        lastName: 'Arnold',
        image: '/images/pros/rylee.jpg',
        type: 'pro',
        dataIndex: 12,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Barry',
        lastName: 'Williams',
        image: '/images/32/barry.jpg',
        type: 'celeb',
        dataIndex: 6,
      },
      {
        firstName: 'Peta',
        lastName: 'Murgatroyd',
        image: '/images/pros/peta.jpg',
        type: 'pro',
        dataIndex: 11,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Lele',
        lastName: 'Pons',
        image: '/images/32/lele.jpg',
        type: 'celeb',
        dataIndex: 7,
      },
      {
        firstName: 'Brandon',
        lastName: 'Armstrong',
        image: '/images/pros/brandon.jpg',
        type: 'pro',
        dataIndex: 2,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Mauricio',
        lastName: 'Umansky',
        image: '/images/32/mauricio.jpg',
        type: 'celeb',
        dataIndex: 8,
      },
      {
        firstName: 'Emma',
        lastName: 'Slater',
        image: '/images/pros/emma.jpg',
        type: 'pro',
        dataIndex: 5,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Mira',
        lastName: 'Sorvino',
        image: '/images/32/mira.jpg',
        type: 'celeb',
        dataIndex: 9,
      },
      {
        firstName: 'Gleb',
        lastName: 'Savchenko',
        image: '/images/pros/gleb.jpg',
        type: 'pro',
        dataIndex: 7,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Adrian',
        lastName: 'Peterson',
        image: '/images/32/adrian.jpg',
        type: 'celeb',
        dataIndex: 10,
      },
      {
        firstName: 'Britt',
        lastName: 'Stewart',
        image: '/images/pros/britt.jpg',
        type: 'pro',
        dataIndex: 3,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Tyson',
        lastName: 'Beckford',
        image: '/images/32/tyson.jpg',
        type: 'celeb',
        dataIndex: 11,
      },
      {
        firstName: 'Jenna',
        lastName: 'Johnson',
        image: '/images/pros/jenna.jpg',
        type: 'pro',
        dataIndex: 8,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Jamie Lynn',
        lastName: 'Spears',
        image: '/images/32/jamielynn.jpg',
        type: 'celeb',
        dataIndex: 12,
      },
      {
        firstName: 'Alan',
        lastName: 'Bersten',
        image: '/images/pros/alan.jpg',
        type: 'pro',
        dataIndex: 0,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstName: 'Matt',
        lastName: 'Walsh',
        image: '/images/32/matt.jpg',
        type: 'celeb',
        dataIndex: 13,
      },
      {
        firstName: 'Koko',
        lastName: 'Iwasaki',
        image: '/images/pros/koko.jpg',
        type: 'pro',
        dataIndex: 9,
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
];

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
        firstname: 'Xochitl',
        lastname: 'Gomez',
        image: '/images/32/xochitl.jpg',
        type: 'celeb',
        dataId: '32_xochitl',
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
        firstname: 'Jason',
        lastname: 'Mraz',
        image: '/images/32/jason.jpg',
        type: 'celeb',
        dataId: '32_jason',
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
        firstname: 'Ariana',
        lastname: 'Madix',
        image: '/images/32/ariana.jpg',
        type: 'celeb',
        dataId: '32_ariana',
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
        firstname: 'Charity',
        lastname: 'Lawson',
        image: '/images/32/charity.jpg',
        type: 'celeb',
        dataId: '32_charity',
      },
      {
        firstname: 'Artem',
        lastname: 'Chigvintsev',
        image: '/images/pros/artem.jpg',
        type: 'pro',
        dataId: 'artem',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Alyson',
        lastname: 'Hannigan',
        image: '/images/32/alyson.jpg',
        type: 'celeb',
        dataId: '32_alyson',
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
        firstname: 'Harry',
        lastname: 'Jowsey',
        image: '/images/32/harry.jpg',
        type: 'celeb',
        dataId: '32_harry',
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
        firstname: 'Barry',
        lastname: 'Williams',
        image: '/images/32/barry.jpg',
        type: 'celeb',
        dataId: '32_barry',
      },
      {
        firstname: 'Peta',
        lastname: 'Murgatroyd',
        image: '/images/pros/peta.jpg',
        type: 'pro',
        dataId: 'peta',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
  {
    placement: 0,
    teamMembers: [
      {
        firstname: 'Lele',
        lastname: 'Pons',
        image: '/images/32/lele.jpg',
        type: 'celeb',
        dataId: '32_lele',
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
        firstname: 'Mauricio',
        lastname: 'Umansky',
        image: '/images/32/mauricio.jpg',
        type: 'celeb',
        dataId: '32_mauricio',
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
        firstname: 'Mira',
        lastname: 'Sorvino',
        image: '/images/32/mira.jpg',
        type: 'celeb',
        dataId: '32_mira',
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
        firstname: 'Adrian',
        lastname: 'Peterson',
        image: '/images/32/adrian.jpg',
        type: 'celeb',
        dataId: '32_adrian',
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
        firstname: 'Tyson',
        lastname: 'Beckford',
        image: '/images/32/tyson.jpg',
        type: 'celeb',
        dataId: '32_tyson',
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
        firstname: 'Jamie Lynn',
        lastname: 'Spears',
        image: '/images/32/jamielynn.jpg',
        type: 'celeb',
        dataId: '32_jamielynn',
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
        firstname: 'Matt',
        lastname: 'Walsh',
        image: '/images/32/matt.jpg',
        type: 'celeb',
        dataId: '32_matt',
      },
      {
        firstname: 'Koko',
        lastname: 'Iwasaki',
        image: '/images/pros/koko.jpg',
        type: 'pro',
        dataId: 'koko',
      },
    ],
    dances: [],
    styles: shuffleStyles().slice(),
  },
];

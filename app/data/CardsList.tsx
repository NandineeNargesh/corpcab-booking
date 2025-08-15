// ✅ Import PNGs so Webpack processes them
import vis from '../public/vis.png';
import appl from '../public/appl.png';
import g from '../public/g.png';

export default [
  {
    id: 1,
    name: 'Master Card',
    image: '/master.svg' // SVG stays as direct path
  },
  {
    id: 2,
    name: 'Visa Card',
    image: vis
  },
  {
    id: 3,
    name: 'Apple Pay',
    image: appl
  },
  {
    id: 4,
    name: 'Phone Pay',
    image: '/phone.svg'
  },
  {
    id: 5,
    name: 'Google Pay',
    image: g
  }
];


]

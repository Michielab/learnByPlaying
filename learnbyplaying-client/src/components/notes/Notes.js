import Clow from '../../sounds/fKey/C-low.m4a';
import Dlow from '../../sounds/fKey/D-low.m4a';
import Elow from '../../sounds/fKey/E-low.m4a';
import Flow from '../../sounds/fKey/F-low.m4a';
import Glow from '../../sounds/fKey/G-low.m4a';
import Alow from '../../sounds/fKey/A-low.m4a';
import Blow from '../../sounds/fKey/B-low.m4a';

import Chigh from '../../sounds/fKey/C-high.m4a';
import Dhigh from '../../sounds/fKey/D-high.m4a';
import Ehigh from '../../sounds/fKey/E-high.m4a';
import Fhigh from '../../sounds/fKey/F-high.m4a';
import Ghigh from '../../sounds/fKey/G-high.m4a';
import Ahigh from '../../sounds/fKey/A-high.m4a';

const notes = {
  fKeySimple: [
    {
      name: 'C',
      sound: Clow,
      line: true
    },
    {
      name: 'D',
      sound: Dlow
    },
    {
      name: 'E',
      sound: Elow
    },
    {
      name: 'F',
      sound: Flow
    },
    {
      name: 'G',
      sound: Glow
    },
    {
      name: 'A',
      sound: Alow
    },
    { name: 'B', sound: Blow },
    {
      name: 'C',
      sound: Chigh
    },
    {
      name: 'D',
      sound: Dhigh
    },
    {
      name: 'E',
      sound: Ehigh
    },
    {
      name: 'F',
      sound: Fhigh
    },
    {
      name: 'G',
      sound: Ghigh
    },
    {
      name: 'A',
      sound: Ahigh,
      line: true
    }
  ]
};

export function getNotes(middle, divider, width, game) {
  let startPointX = 160;
  let x = (width - startPointX) / notes[game].length;
  let dividerNotes = divider / 2;
  return notes[game].map((note, index) => {
    return {
      ...note,
      positionX: startPointX + x * index,
      positionY: middle - dividerNotes * (index - (notes[game].length - 1) / 2)
    };
  });
}

// const notes = [
//   {
//     name: 'C',
//     positionX: startPointX,
//     positionY: middle + (divider / 2) * 6,
//     line: true
//   },
//   {
//     name: 'D',
//     positionX: startPointX + x,
//     positionY: middle + (divider / 2) * 5
//   },
//   {
//     name: 'E',
//     positionX: startPointX + x * 2,
//     positionY: middle + (divider / 2) * 4
//   },
//   {
//     name: 'F',
//     positionX: startPointX + x * 3,
//     positionY: middle + (divider / 2) * 3
//   },
//   {
//     name: 'G',
//     positionX: startPointX + x * 4,
//     positionY: middle + (divider / 2) * 2,
//     sound: G
//   },
//   {
//     name: 'A',
//     positionX: startPointX + x * 5,
//     positionY: middle + divider / 2
//   },
//   { name: 'B', positionX: startPointX + x * 6, positionY: middle },
//   {
//     name: 'C',
//     positionX: startPointX + x * 7,
//     positionY: middle - divider / 2
//   },
//   {
//     name: 'D',
//     positionX: startPointX + x * 8,
//     positionY: middle - (divider / 2) * 2
//   },
//   {
//     name: 'E',
//     positionX: startPointX + x * 9,
//     positionY: middle - (divider / 2) * 3
//   },
//   {
//     name: 'F',
//     positionX: startPointX + x * 10,
//     positionY: middle - (divider / 2) * 4
//   },
//   {
//     name: 'G',
//     positionX: startPointX + x * 11,
//     positionY: middle - (divider / 2) * 5
//   },
//   {
//     name: 'A',
//     positionX: startPointX + x * 12,
//     positionY: middle - (divider / 2) * 6,
//     line: true
//   }
// ];

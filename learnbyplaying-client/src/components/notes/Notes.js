import Clow from '../../sounds/fKey/C-low.wav';
import Dlow from '../../sounds/fKey/D-low.wav';
import Elow from '../../sounds/fKey/E-low.wav';
import Flow from '../../sounds/fKey/F-low.wav';
import Glow from '../../sounds/fKey/G-low.wav';
import Alow from '../../sounds/fKey/A-low.wav';
import Blow from '../../sounds/fKey/B-low.wav';

import Chigh from '../../sounds/fKey/C-high.wav';
import Dhigh from '../../sounds/fKey/D-high.wav';
import Ehigh from '../../sounds/fKey/E-high.wav';
import Fhigh from '../../sounds/fKey/F-high.wav';
import Ghigh from '../../sounds/fKey/G-high.wav';
import Ahigh from '../../sounds/fKey/A-high.wav';

export const startPointX = 160;

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
  startPointX;
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
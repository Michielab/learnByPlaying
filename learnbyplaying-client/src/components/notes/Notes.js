import G from '../../sounds/fKey/Gsleutel.m4a';

const notes = {
  fKeySimple: [
    {
      name: 'C',
      line: true
    },
    {
      name: 'D'
    },
    {
      name: 'E'
    },
    {
      name: 'F'
    },
    {
      name: 'G',
      sound: G
    },
    {
      name: 'A'
    },
    { name: 'B' },
    {
      name: 'C'
    },
    {
      name: 'D'
    },
    {
      name: 'E'
    },
    {
      name: 'F'
    },
    {
      name: 'G'
    },
    {
      name: 'A',
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

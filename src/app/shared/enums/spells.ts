export enum Spells {
  P = 0,
  Q = 1,
  W = 2,
  E = 3,
  R = 4,
}

export const spellToLabel = new Map<Spells, string>([
  [Spells.P, 'P'],
  [Spells.Q, 'Q'],
  [Spells.W, 'W'],
  [Spells.E, 'E'],
  [Spells.R, 'R'],
])

export class spellListModel {
  key: number;
  label: string;
  active: boolean;
}

export function getSpellsList(): Array<[number, string]> {
  let result: Array<[number, string]> = [];

  Object.values(Spells).filter(element => typeof element === 'number')
    .map(key => {
      result.push([
        key as number,
        spellToLabel.get(key as Spells) as string,
      ]);
    });

  return result;
}
// export function getSpellsList(): Array<spellListModel> {
//   let result: Array<spellListModel> = [];

//   Object.values(Spells).filter(element => typeof element === 'number')
//     .map(enumKey => {
//       result.push({
//         key: enumKey as number,
//         label: spellToLabel.get(enumKey as Spells) as string,
//         active: false
//       });
//     });

//   return result;
// }

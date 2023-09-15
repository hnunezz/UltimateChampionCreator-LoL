import { Spells } from "../enums/spells";

export class SpellSelect {
  champion: string
  description: string;
  title: string;
  image: string;
  selected: boolean;
  hovered: boolean;
}

export class SpellList {
  type: Spells;
  typeLabel: string;
  spells: SpellSelect[];
}
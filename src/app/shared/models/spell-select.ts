import { Spells } from "../enums/spells";

export class SpellSelect {
  champion: string
  description: string;
  title: string;
  image: string;
  selected: boolean;
}

export class SpellList {
  type: Spells;
  typeLabel: string;
  spells: SpellSelect[];
}

export class ChampionList {
  id: number;
  id_name: string;
  name: string;
  title: string;
  description: string;
  image: string;
  tiles: string;
  selected: boolean;
}

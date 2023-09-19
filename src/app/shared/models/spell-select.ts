import { Spells } from "../enums/spells";

export class SpellSelect {
  champion: string
  description: string;
  title: string;
  image: string;
  // passive_name: string;
  // spell_name_Q: string;
  // spell_name_W: string;
  // spell_name_E: string;
  // spell_name_R: string;
  selected: boolean;
  hovered: boolean;
}

export class SpellList {
  type: Spells;
  typeLabel: string;
  spells: SpellSelect[];
}

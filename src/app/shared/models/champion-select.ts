import { SpellSelect } from "./spell-select";

export class ChampionSelect {
  name: string;
  image: string;
  spells: SpellSelect[];

  constructor() {
    this.name = '';
    this.image = '';
    this.spells = new Array<SpellSelect>(5);
  }
}

import { ImageModel } from "./image.model";
import { SkinsModel } from "./skins.model";
import { SpellModel } from "./spell.model";

export interface Champion {
  id: string;
  id_name: string;
  key: string;
  name: string;
  title: string;
  image: ImageModel | any;
  skins: Array<SkinsModel>;
  lore: string;
  tags: [string, string];
  description: string;
  partype: string;
  spells: Array<SpellModel>;
  passive: SpellModel;
  tiles: string;
  selected: boolean;
}

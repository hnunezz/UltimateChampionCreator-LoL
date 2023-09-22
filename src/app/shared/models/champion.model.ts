export class SpellModel {
  id: string;
  name: string;
  description: string;
  image: ImageModel;
}

export class ImageModel {
  full: string
  sprite: string
}

export interface Champion {
  id: string;
  id_name: string;
  key: string;
  name: string;
  title: string;
  image: ImageModel | any;
  skins: Array<any>;
  lore: string;
  tags: [string, string];
  description: string;
  partype: string;
  tiles: string;
  selected: boolean;
  spells: Array<SpellModel>;
  passive: SpellModel;
}

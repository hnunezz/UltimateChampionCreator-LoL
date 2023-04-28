import { SpellModel } from './spell.model';
import { ImageModel } from "./image.model";
import { SkinsModel } from './skins.model';

export class Champions {
  id: string;
  key: number;
  name: string;
  title: string;
  image: ImageModel;
  skins: Array<SkinsModel>;
  lore: string;
  tags: [string, string];
  partype: string;
  spells: Array<SpellModel>;
  passive: SpellModel;

  // constructor(instanceData?: Champions) {
  //   if (instanceData) {
  //     this.deserialize(instanceData);
  //   }
  // }

  // private deserialize(instanceData: Champions) {
  //   const keys = Object.keys(instanceData);
  //   keys.forEach(key => this[key] = instanceData[key]);
  // }

  // constructor(instanceData?: Champions) {
  //   if (instanceData) {
  //     this.deserialize(instanceData);
  //   }
  // }

  // private deserialize(instanceData: Champions) {
  //   const keys = Object.keys(instanceData);
  //   keys.forEach(key => this[key] = instanceData[key]);
  // }
}

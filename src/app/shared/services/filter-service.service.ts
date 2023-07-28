import { Injectable } from '@angular/core';
import { CacheService } from './cache-service.service';
import { ChampionList, SpellList, SpellSelect } from '../models/spell-select';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private cacheService: CacheService) { }

  public filterChampion(value: string): ChampionList[] {
    let result = [];
    const champs = JSON.parse(this.cacheService.get('championsSelection') as string) as ChampionList[];

    if (value == '') {
      result = champs;
    } else {
      result = [
        ...champs.filter((x: ChampionList) => { return x.name.toLowerCase().includes(value.toLowerCase()) }),
      ];
    }

    return result;
  }

  public filterSpell(value: string, cache: string, selected: number): SpellSelect[] {
    let result = [];
    const spells = JSON.parse(this.cacheService.get(cache) as string) as SpellList[];

    if (value == '') {
      result = spells[selected].spells;
    } else {
      result = [
        ...spells[selected].spells.filter(x => { return x.champion.toLowerCase().includes(value.toLowerCase()) }),
        ...spells[selected].spells.filter(x => { return x.title.toLowerCase().includes(value.toLowerCase()) })
      ];
    }

    return result;
  }
}

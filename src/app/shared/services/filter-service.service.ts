import { Injectable, inject } from '@angular/core';
import { CacheService } from './cache-service.service';
import { Champion } from '../models/champion.model';
import { SpellList, SpellSelect } from '../models/spell-select';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private cacheService = inject(CacheService);

  filterChampion(value: string): Champion[] {
    let result = [];
    const champs = JSON.parse(this.cacheService.get('championsSelection') as string) as Champion[];

    if (value == '') {
      result = champs;
    } else {
      result = [
        ...champs.filter((x: Champion) => { return x.name.toLowerCase().includes(value.toLowerCase()) }),
      ];
    }

    return result;
  }

  filterSpell(value: string, cache: string, selected: number): SpellSelect[] {
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

import { Injectable } from '@angular/core';
import { CacheService } from './cache-service.service';
import { ChampionList } from '../models/spell-select';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private cacheService: CacheService) { }

  public filterChampion(value: string): Array<ChampionList> {
    let result = [];
    const champs = JSON.parse(this.cacheService.get('championsSelection') as string) as Array<ChampionList>;

    if (value == '') {
      result = champs;
    } else {
      result = [
        ...champs.filter((x: ChampionList) => { return x.name.toLowerCase().includes(value.toLowerCase()) }),
      ];
    }

    return result;
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CacheService } from './cache-service.service';
import { ResponseModel } from '../models/response-model.models';
import { Champion } from '../models/champion.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  private _url = '../../../assets/data/champions-full.json';

  private championsSubject = new BehaviorSubject<Champion[]>([]);

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  get champions$(): Observable<Champion[]> {
    return this.championsSubject.asObservable();
  }

  set champions(value: Champion[]) {
    this.championsSubject.next(value);
  }

  getChampions() {
    this.http.get<ResponseModel<Champion[]>>(this._url)
      .subscribe(champ => {
        this.champions = Object
          .values(champ.data)
          .map(x => {
            return {
              id: x.key,
              id_name: x.id,
              key: x.key,
              name: x.name,
              title: x.title,
              tiles: x.image.sprite,
              image: x.image.full,
              skins: x.skins,
              lore: x.lore,
              tags: x.tags,
              description: x.description,
              partype: x.partype,
              spells: x.spells,
              passive: x.passive,
              selected: false,
            }
          })
      });
  }


  // public setChampions(cached: string) {
  //   this._champions = Object.values(JSON.parse(cached));
  // }

  // public getChampionsSpells(): SpellList[] {
  //   const cacheKey = "championsSpells";
  //   const cachedSpells = localStorage.getItem(cacheKey);

  //   if (cachedSpells) { return JSON.parse(cachedSpells); }

  //   const spellsList = getSpellsList();
  //   const result: SpellList[] = [];

  //   for (let i = 0; i < spellsList.length; i++) {
  //     const [type, typeLabel] = spellsList[i];
  //     const spells: SpellSelect[] = [];

  //     this._champions.forEach((champ) => {
  //       const spellIndex = type - 1;
  //       const spell = spellIndex === -1 ? champ.passive : champ.spells[spellIndex];

  //       spells.push({
  //         champion: champ.name,
  //         description: spell.description,
  //         title: spell.name,
  //         image: spell.image.full,
  //         selected: false,
  //         hovered: false
  //       });
  //     });

  //     result.push({ type, typeLabel, spells });
  //   }

  //   localStorage.setItem(cacheKey, JSON.stringify(result));
  //   return result;
  // }

  // public getChampionsList(): ChampionList[] {
  //   const cacheKey = "championsSelection";
  //   const cachedChamps = localStorage.getItem(cacheKey);

  //   if (cachedChamps) { return JSON.parse(cachedChamps); }

  //   const result: ChampionList[] = [];

  //   this._champions.forEach((champ) => {
  //     result.push({
  //       id: champ.key,
  //       id_name: champ.id,
  //       name: champ.name,
  //       title: champ.title,
  //       description: champ.lore,
  //       image: champ.image.full,
  //       tiles: champ.image.sprite,
  //       selected: false
  //     });
  //   });

  //   localStorage.setItem(cacheKey, JSON.stringify(result));
  //   return result;
  // }
}

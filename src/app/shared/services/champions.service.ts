import { CacheService } from './cache-service.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Champions } from '../models/champions';
import { Observable, from, lastValueFrom, map } from 'rxjs';
import { ResponseModel } from '../models/response-model.models';
import { ChampionList, SpellList, SpellSelect } from '../models/spell-select';
import { getSpellsList } from '../enums/spells';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  private _url = '../../../assets/data/champions-full.json';
  private _champions: Array<Champions>;
  // private _urlChampionsDetails = 'https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/'; //? {champ}.json

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  public async getChampions() {
    const result = await lastValueFrom(this.http.get(this._url)) as ResponseModel<Champions>;
    this.cacheService.set('champions', JSON.stringify(result.data));

    this.setChampions(JSON.stringify(result.data))
  }

  public setChampions(cached: string) {
    this._champions = Object.values(JSON.parse(cached));
  }

  public getChampionsSpells(): SpellList[] {
    const cacheKey = "championsSpells";
    const cachedSpells = localStorage.getItem(cacheKey);

    if (cachedSpells) { return JSON.parse(cachedSpells); }

    const spellsList = getSpellsList();
    const result: SpellList[] = [];

    for (let i = 0; i < spellsList.length; i++) {
      const [type, typeLabel] = spellsList[i];
      const spells: SpellSelect[] = [];

      this._champions.forEach((champ) => {
        const spellIndex = type - 1;
        const spell = spellIndex === -1 ? champ.passive : champ.spells[spellIndex];

        spells.push({
          champion: champ.name,
          description: spell.description,
          title: spell.name,
          image: spell.image.full,
          selected: false,
          hovered: false
        });
      });

      result.push({ type, typeLabel, spells });
    }

    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  }

  public getChampionsList(): ChampionList[] {
    const cacheKey = "championsSelection";
    const cachedChamps = localStorage.getItem(cacheKey);

    if (cachedChamps) { return JSON.parse(cachedChamps); }

    const result: ChampionList[] = [];

    this._champions.forEach((champ) => {
      result.push({
        id: champ.key,
        id_name: champ.id,
        name: champ.name,
        title: champ.title,
        description: champ.lore,
        image: champ.image.full,
        tiles: champ.image.sprite,
        selected: false
      });
    });

    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  }
}

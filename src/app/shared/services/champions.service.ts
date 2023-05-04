import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Champions } from '../models/champions';
import { Observable, from, lastValueFrom, map } from 'rxjs';
import { ResponseModel } from '../models/response-model.models';
import { SpellList, SpellSelect } from '../models/spell-select';
import { getSpellsList } from '../enums/spells';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService implements OnInit {

  private _champions: Champions[] = [];
  private _url = '../../../assets/data/champions-full.json';

  // private _urlChampionsDetails = 'https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/'; //? {champ}.json
  // private _urlChampionsIMG = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

  public get hasChampions(): boolean { return this._champions.length > 0; }

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    if (!this.hasChampions) { this._champions = await this.getChampions(); }
  }

  async getChampions(): Promise<Champions[]> {
    this._champions = [];
    const response$ = await lastValueFrom(this.http.get(this._url)) as ResponseModel;

    Object.values(response$.data).map((element: any, index) => {
      this._champions.push({
        id: element.id,
        key: element.key,
        image: element.image.full,
        lore: element.lore,
        name: element.name,
        partype: element.partype,
        passive: element.passive,
        skins: element.skins,
        spells: element.spells,
        tags: element.tags,
        title: element.title,
      })
    })

    return this._champions;
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
        });
      });

      result.push({ type, typeLabel, spells });
    }

    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  }
}

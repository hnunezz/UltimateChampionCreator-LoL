
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Champion } from '../models/champion.model';
import { ResponseModel } from '../models/response-model.models';
import { SpellList, SpellSelect } from '../models/spell-select';
import { getSpellsList } from '../enums/spells';
import { ChampionListService } from 'src/app/features/create-champion/champion-list/services/champion-list.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _url = '../../../assets/data/champions-full.json';

  constructor(private http: HttpClient,
    private championList: ChampionListService) { }

  getChampions() {
    this.http.get<ResponseModel<Champion[]>>(this._url)
      .subscribe(champ => {
        this.championList.champions = Object
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
}

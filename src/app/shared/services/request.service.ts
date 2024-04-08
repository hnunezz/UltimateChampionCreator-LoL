
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ChampionListService } from 'src/app/features/create-champion/champion-list/services/champion-list.service';
import { _url, _urlApiVersion } from 'src/assets/enviroment';
import { Champion } from '../models/champion.model';
import { ResponseModel } from '../models/response-model.models';
import { CacheService } from './cache-service.service';
import { all_champions } from 'src/assets/data/all-champions';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private championList = inject(ChampionListService);
  private cacheService = inject(CacheService);

  getChampions() {
    if (!this.cacheService.get('api_version')) {
      console.error('API Version does not exist!!')
      return;
    }

    let result: Champion[] = [];
    let version = this.cacheService.get('api_version') as string;

    let URL_KEY = `https://ddragon.leagueoflegends.com/cdn`;

    all_champions
      .sort()
      .forEach(name => {
        const storage_champion = this.cacheService.get(name);

        if (!storage_champion) {
          this.http
            .get<ResponseModel<Champion[]>>(_url(version, name))
            .subscribe(champ => {

              const champion: Champion = {
                id: Object.values(champ.data)[0].key,
                id_name: Object.values(champ.data)[0].id,
                key: Object.values(champ.data)[0].key,
                name: Object.values(champ.data)[0].name,
                title: Object.values(champ.data)[0].title,
                tiles: `${URL_KEY}/img/champion/tiles/${Object.values(champ.data)[0].id}_0.jpg`,
                image: `${URL_KEY}/img/champion/splash/${Object.values(champ.data)[0].id}_0.jpg`,
                skins: Object.values(champ.data)[0].skins,
                lore: Object.values(champ.data)[0].lore,
                tags: Object.values(champ.data)[0].tags,
                description: Object.values(champ.data)[0].description,
                partype: Object.values(champ.data)[0].partype,
                spells: Object.values(champ.data)[0].spells,
                passive: Object.values(champ.data)[0].passive,
                selected: false,
              }

              //* FiddleSticks valid image *//
              if (champion.key == '9') {
                champion.tiles = `${URL_KEY}/img/champion/tiles/FiddleSticks_0.jpg`
              }
              //* FiddleSticks valid image *//

              //* Unique rules for Passive and Spells  *//
              champion.passive.image.full = `${URL_KEY}/${version}/img/passive/${champion.passive.image.full}`
              champion.spells.map(c => c.image.full = `${URL_KEY}/${version}/img/spell/${c.image.full}`);
              //* Unique rules for Passive and Spells *//

              result.push(champion);

              this.cacheService.set(name, JSON.stringify(champion));
            });
        } else {
          result.push(JSON.parse(storage_champion));
        }
      })

    this.championList.champions = result;
  }

  getVersion() {
    this.http.get<string[]>(_urlApiVersion)
      .subscribe(arr => {
        this.cacheService.set('api_version', arr[0])
      });
  }
}

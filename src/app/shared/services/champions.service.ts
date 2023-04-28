import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Champions } from '../models/champions';
import { Observable, from, lastValueFrom, map } from 'rxjs';
import { ResponseModel } from '../models/response-model.models';
import { PassiveSelect } from '../models/passive-select';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  private _champions: Champions[] = [];
  private _url = '../../../assets/data/champions-full.json';

  // private _urlChampionsDetails = 'https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/'; //? {champ}.json
  // private _urlChampionsIMG = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

  constructor(private http: HttpClient) { }

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

  public getChampionsPassives(): Array<PassiveSelect> {
    return this._champions.map(champ => {
      return {
        champion: champ.id,
        description: champ.passive.description,
        image: champ.passive.image.full,
        title: champ.passive.name,
        selected: false,
        type: 'p'
      }
    })
  }

  // async getChampionSelec(): Promise<Champions[]> {

  //   return this._champions;
  // }

  // const response = await this.requestService.get(`${APIS.CEDENTE}${APIS.GET_COMMON}${APIS.CNPJCNPF}/${APIS.GESTORA}`,
  //   new HttpParams().append('cnpjcpf', this.cnpjValue).append('fidcid', this.fidcModelValue));

  // const data = response.model as Assignor;

  // getChampionsDetails(name: string): Observable<any> {
  //   return this.http.get(`${this._urlChampionsDetails}${name}.json`) as Observable<any>;
  // }
}

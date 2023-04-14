import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Champions } from '../models/champions.models';
import { Observable, from, map } from 'rxjs';
import { ResponseModel } from '../models/response-model.models';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  private _urlChampions = 'http://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json';
  private _urlChampionsDetails = 'https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion/'; //? {champ}.json

  private _urlChampionsIMG = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
  constructor(private http: HttpClient) { }

  getChampions(): Champions[] {
    const _champions: Champions[] = [];
    const response$ = this.http.get(this._urlChampions) as Observable<ResponseModel>;

    response$.subscribe(model => Object.values(model.data)
      .map((element: any) => {
        _champions.push({
          id: element.id,
          image: element.image.full,
          name: element.name
        })
      }))

    return _champions;
  }

  getChampionsDetails(name: string): Observable<any> {
    return this.http.get(`${this._urlChampionsDetails}${name}.json`) as Observable<any>;
  }
}

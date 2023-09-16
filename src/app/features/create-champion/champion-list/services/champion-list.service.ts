import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Champion } from 'src/app/shared/models/champion.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionListService {
  private championsSubject = new BehaviorSubject<Champion[]>([]);

  constructor() { }

  get champions$(): Observable<Champion[]> {
    return this.championsSubject.asObservable();
  }

  set champions(value: Champion[]) {
    this.championsSubject.next(value);
  }
}

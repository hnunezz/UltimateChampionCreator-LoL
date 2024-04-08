import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { Champion } from 'src/app/shared/models/champion.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionListService {
  private championsSubject = new BehaviorSubject<Champion[]>([]);

  get champions$(): Promise<Observable<Champion[]>> {
    return lastValueFrom(of(this.championsSubject.asObservable()));
  }

  set champions(value: Champion[]) {
    this.championsSubject.next(value);
  }
}

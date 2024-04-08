import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellListService {
  private spellSubject = new BehaviorSubject<number | null>(null);

  get spell$(): Observable<number | null> {
    return this.spellSubject.asObservable();
  }

  set spell(value: number) {
    this.spellSubject.next(value);
  }
}

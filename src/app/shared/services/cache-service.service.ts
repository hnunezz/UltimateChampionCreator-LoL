import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  set(key: string, value: string) {
    if (localStorage.getItem(key)) { localStorage.removeItem(key); }

    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    const result = localStorage.getItem(key);
    return result
  }
}

import { ChampionsService } from './shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Champions } from './shared/models/champions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Welcolme to Perfect Champ';

  constructor() { }

  ngOnInit(): void {
  }
}

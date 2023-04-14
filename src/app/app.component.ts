import { ChampionsService } from './shared/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Champions } from './shared/models/champions.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PerfectChamp-LoL';

  champions: Champions[];

  constructor(private championsService: ChampionsService) { }

  ngOnInit(): void {
    this.champions = this.championsService.getChampions();
  }
}

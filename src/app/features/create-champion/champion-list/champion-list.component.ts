import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Champion } from 'src/app/shared/models/champion.model';
import { ChampionsService } from 'src/app/shared/services/champions.service';
import { FilterService } from 'src/app/shared/services/filter-service.service';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  public championsList: Champion[] = [];

  public get hasChampion(): boolean { return this.championsList.length > 0; }
  public get hasChampionSelect(): boolean { return !this.championsList.some(x => x.selected == true) }

  constructor(
    private filterService: FilterService,
    private ref: DynamicDialogRef,
    private championService: ChampionsService
  ) { }

  ngOnInit(): void {
    this.championService.champions$
      .subscribe(champ => this.championsList = champ);
  }

  filterChampion(event: string) {
    this.championsList = this.filterService.filterChampion(event);
  }

  selectChamp(champion: Champion) {
    this.championsList.map(x => x.selected = false);
    champion.selected = !champion.selected;
  }

  handleChampionListSelectChange() {
    const result = this.championsList.find(x => x.selected) as Champion;
    this.ref.close(result);
  }

}

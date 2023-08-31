import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChampionList } from 'src/app/shared/models/spell-select';
import { ChampionsService } from 'src/app/shared/services/champions.service';
import { FilterService } from 'src/app/shared/services/filter-service.service';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent {
  public championsList: ChampionList[] = [];

  public get hasChampion(): boolean { return this.championsList.length > 0; }
  public get hasChampionSelect(): boolean { return !this.championsList.some(x => x.selected == true) }

  constructor(
    private filterService: FilterService,
    private ref: DynamicDialogRef,
    private championService: ChampionsService
  ) {
    this.championsList = this.championService.getChampionsList();
  }

  public filterChampion(event: string) {
    this.championsList = this.filterService.filterChampion(event);
  }

  public selectChamp(champion: ChampionList) {
    this.championsList.map(x => x.selected = false);
    champion.selected = !champion.selected;
  }

  public handleChampionSelectChange() {
    const result = this.championsList.find(x => x.selected) as ChampionList;
    this.ref.close(result);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChampionList } from 'src/app/shared/models/spell-select';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent {
  @Input() championsList: Array<ChampionList> = [];
  @Output() championSelectChangeEmitter: EventEmitter<ChampionList> = new EventEmitter<ChampionList>();

  constructor() { }

  displayMaximizable: boolean;
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  public selectChamp(champion: ChampionList): void {
    this.championsList.map(x => x.selected = false);
    champion.selected = !champion.selected;
  }

  public handleChampionSelectChange(): void {
    const result = this.championsList.find(x => x.selected)
    this.championSelectChangeEmitter.emit(result);
    this.displayMaximizable = false;
  }
}

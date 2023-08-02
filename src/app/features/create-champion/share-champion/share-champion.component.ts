import { ChampionSelect } from 'src/app/shared/models/champion-select';
import { ChampionList } from './../../../shared/models/spell-select';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-champion',
  templateUrl: './share-champion.component.html',
  styleUrls: ['./share-champion.component.scss']
})
export class ShareChampionComponent {

  @Input() public champion: ChampionList;
  @Input() public championsSelectResult: ChampionSelect;

  public get hasChampion(): boolean {
    return this.champion.name !== undefined;
  }
  public get disableButton(): boolean {
    return (this.championsSelectResult.spells.filter(x => x.selected == true).length === 5)
      && this.hasChampion;
  }
}

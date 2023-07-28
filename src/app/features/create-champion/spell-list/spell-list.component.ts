
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { ChampionsService } from 'src/app/shared/services/champions.service';
import { FilterService } from 'src/app/shared/services/filter-service.service';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss']
})
export class SpellListComponent {

  @Input() public selectedSpell: number;
  @Output() public emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  public listGeneralSpells: SpellList[] = []

  constructor(private filterService: FilterService, private championService: ChampionsService) {
    this.listGeneralSpells = this.championService.getChampionsSpells();
  }

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }

  public filterSpell(event: string): void {
    this.listGeneralSpells[this.selectedSpell].spells = this.filterService.filterSpell(event, 'championsSpells', this.selectedSpell);
  }
}

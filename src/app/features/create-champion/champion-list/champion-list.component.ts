import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent {

  @Input() public listGeneralSpells: SpellList = new SpellList()
  @Input() public selectedSpell: number;

  @Output() public emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }
}

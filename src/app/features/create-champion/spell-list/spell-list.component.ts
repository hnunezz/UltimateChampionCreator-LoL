
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss']
})
export class SpellListComponent {

  @Input() public listGeneralSpells: SpellList = new SpellList()
  @Input() public selectedSpell: number;

  @Output() public emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect): void {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }
}

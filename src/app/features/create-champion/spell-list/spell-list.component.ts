import { Champion } from './../../../shared/models/champion.model';

import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { FilterService } from 'src/app/shared/services/filter-service.service';
import { ChampionListService } from '../champion-list/services/champion-list.service';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss'],
})
export class SpellListComponent implements OnChanges, OnInit {
  @ViewChild(VirtualScroller) el: VirtualScroller;
  enabled: boolean = true;

  @Input() public selectedSpell: number;
  @Output() public emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  public listGeneralSpells: SpellList[] = []

  get hasSpell(): boolean {
    return this.listGeneralSpells[this.selectedSpell]?.spells.length > 0;
  }

  constructor(
    private filterService: FilterService,
    private championList: ChampionListService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getSpells();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.getSpells();
      this.reset();
    }
  }

  selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect) {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }

  filterSpell(event: string) {
    this.listGeneralSpells[this.selectedSpell].spells = this.filterService.filterSpell(event, 'championsSpells', this.selectedSpell);
  }

  private reset() {
    this.enabled = false;

    this.el?.scrollToIndex(0)
    this.filterSpell('');
    this.changeDetector.detectChanges();

    this.enabled = true;
  }

  private getSpells() {
    const spellsList = getSpellsList();
    const result: SpellList[] = [];

    for (let i = 0; i < spellsList.length; i++) {
      const [type, typeLabel] = spellsList[i];
      const spells: SpellSelect[] = [];

      this.championList.champions$
        .subscribe((champ$: Champion[]) => {
          champ$.forEach(champ => {
            const spellIndex = type - 1;
            const spell = spellIndex === -1 ? champ.passive : champ.spells[spellIndex];

            spells.push({
              champion: champ.name,
              description: spell.description,
              title: spell.name,
              image: spell.image.full,
              selected: false,
              hovered: false
            });
          })
        })
      result.push({ type, typeLabel, spells });
    }

    this.listGeneralSpells = result;
  }
}

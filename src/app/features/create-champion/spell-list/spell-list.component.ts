
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { ChampionsService } from 'src/app/shared/services/champions.service';
import { FilterService } from 'src/app/shared/services/filter-service.service';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss'],
})
export class SpellListComponent implements OnChanges {
  @ViewChild(VirtualScroller) el: VirtualScroller;
  enabled: boolean = true;

  @Input() public selectedSpell: number;
  @Output() public emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  public listGeneralSpells: SpellList[] = []

  public get hasSpell(): boolean { return this.listGeneralSpells[this.selectedSpell].spells.length > 0; }


  constructor(
    private filterService: FilterService,
    private championService: ChampionsService,
    private changeDetector: ChangeDetectorRef) {
    this.listGeneralSpells = this.championService.getChampionsSpells();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.reset();
    }
  }

  public selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect) {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }

  public filterSpell(event: string) {
    this.listGeneralSpells[this.selectedSpell].spells = this.filterService.filterSpell(event, 'championsSpells', this.selectedSpell);
  }

  private reset() {
    this.enabled = false;

    this.el?.scrollToIndex(0)
    this.filterSpell('');
    this.changeDetector.detectChanges();

    this.enabled = true;
  }
}

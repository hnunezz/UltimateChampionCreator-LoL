import { Champion } from './../../../shared/models/champion.model';

import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { VirtualScroller } from 'primeng/virtualscroller';
import { getSpellsList } from 'src/app/shared/enums/spells';
import { SpellList, SpellSelect } from 'src/app/shared/models/spell-select';
import { CacheService } from 'src/app/shared/services/cache-service.service';
import { FilterService } from 'src/app/shared/services/filter-service.service';
import { ChampionListService } from '../champion-list/services/champion-list.service';
import { SpellListService } from './services/spell-list.service';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss'],
})
export class SpellListComponent implements OnInit {
  @ViewChild(VirtualScroller) el: VirtualScroller;

  @Output() emitSelectedSpell: EventEmitter<SpellSelect> = new EventEmitter<SpellSelect>();

  private filterService = inject(FilterService);
  private championList = inject(ChampionListService);
  private spellListService = inject(SpellListService);
  private cacheService = inject(CacheService);

  private STORAGE_KEY = 'spells';

  listGeneralSpells: SpellList[] = []
  selectedSpell: number;
  hasData: boolean = false;

  ngOnInit() {
    this.hasData = false;

    this.spellListService.spell$
      .subscribe(spell => {
        this.selectedSpell = spell as number
        this.getSpells();

        this.hasData = spell !== null;
      });
  }

  selectHability(allSpells: Array<SpellSelect>, spellSelected: SpellSelect) {
    allSpells.forEach((element: SpellSelect) => element.selected = (element === spellSelected))
    this.emitSelectedSpell.emit(spellSelected)
  }

  filterSpell(event: string) {
    this.listGeneralSpells[this.selectedSpell].spells = this.filterService.filterSpell(event, this.STORAGE_KEY, this.selectedSpell);
  }

  private async getSpells() {
    const spellsList = getSpellsList();
    const result: SpellList[] = [];

    for (let i = 0; i < spellsList.length; i++) {
      const [type, typeLabel] = spellsList[i];
      const spells: SpellSelect[] = [];

      const result$ = await this.championList.champions$;

      result$.subscribe((champ$: Champion[]) => {
        champ$.forEach(champ => {
          const spellIndex = type - 1;
          const spell = spellIndex === -1 ? champ.passive : champ.spells[spellIndex];

          spells.push({
            champion: champ.name,
            description: spell.description,
            title: spell.name,
            image: spellIndex === -1 ? champ.passive.image.full : champ.spells[spellIndex].image.full,
            selected: false,
            hovered: false,
          });
        })
      })

      result.push({ type, typeLabel, spells });
    }

    this.cacheService.set(this.STORAGE_KEY, JSON.stringify(result));
    this.listGeneralSpells = result;
  }
}
